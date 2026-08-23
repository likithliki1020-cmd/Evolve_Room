/**
 * Quick Test Backend Server for Razorpay & Email Integration
 * Handles payment orders and booking confirmation emails
 */

const express = require('express');
const cors = require('cors');

let Razorpay;
try {
  Razorpay = require('razorpay');
} catch (e) {
  console.warn('⚠️  Razorpay package not installed');
}

let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  console.warn('⚠️  Nodemailer package not installed');
}

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Razorpay if credentials are available
let razorpayInstance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET && Razorpay) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log('✓ Razorpay API initialized');
}

// Setup email transporter
let emailTransporter = null;
let setupEmailTransporter = async () => {
  if (!nodemailer) return;

  if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
    // Use provided SMTP configuration
    emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('✓ SMTP email configured');
  } else {
    // Use Ethereal test account (free, with web preview)
    try {
      const testAccount = await nodemailer.createTestAccount();
      emailTransporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log('✓ Ethereal test email configured');
      console.log('📧 Sent emails will appear at: https://ethereal.email/messages');
      console.log('   Login with: ' + testAccount.user);
    } catch (error) {
      console.warn('⚠️  Could not setup Ethereal:', error.message);
      // Fallback to test mode
      emailTransporter = {
        sendMail: async (mailOptions) => {
          console.log('📧 Test email (logged only):', {
            to: mailOptions.to,
            subject: mailOptions.subject,
          });
          return { messageId: `test_${Date.now()}` };
        },
      };
    }
  }
};

setupEmailTransporter();

// In-memory store for orders
const orders = new Map();

/**
 * POST /api/courses/checkout
 * Create a Razorpay order
 */
app.post('/api/courses/checkout', async (req, res) => {
  try {
    const { courseId, amount, currency = 'INR' } = req.body;

    if (!courseId || !amount) {
      return res.status(400).json({
        error: 'courseId and amount are required',
      });
    }

    let orderId;

    // Try to create real Razorpay order if API is available
    if (razorpayInstance) {
      try {
        const razorpayOrder = await razorpayInstance.orders.create({
          amount: amount * 100,
          currency: currency,
          receipt: `${courseId}_${Date.now()}`,
          payment_capture: 1,
        });
        orderId = razorpayOrder.id;
        console.log('✓ Real Razorpay order created:', orderId);
      } catch (razorpayError) {
        return res.status(500).json({
          success: false,
          error: `Razorpay API error: ${razorpayError.message}`,
        });
      }
    } else {
      orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      console.log('⚠️  Mock order:', orderId);
    }

    orders.set(orderId, {
      courseId,
      amount,
      currency,
      createdAt: new Date(),
    });

    res.json({
      success: true,
      order_id: orderId,
      amount: amount * 100,
      currency: currency,
    });
  } catch (error) {
    console.error('❌ Checkout error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
    });
  }
});

/**
 * POST /api/courses/verify
 * Verify Razorpay payment signature
 */
app.post('/api/courses/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment details',
      });
    }

    if (!orders.has(razorpay_order_id)) {
      return res.status(400).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Verify signature if Razorpay is configured
    if (razorpayInstance && process.env.RAZORPAY_KEY_SECRET) {
      try {
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generated_signature = hmac.digest('hex');

        if (generated_signature !== razorpay_signature) {
          return res.status(400).json({
            success: false,
            message: 'Invalid payment signature',
          });
        }

        console.log('✓ Payment signature verified:', razorpay_payment_id);
      } catch (cryptoError) {
        return res.status(500).json({
          success: false,
          message: 'Failed to verify signature',
        });
      }
    } else {
      console.log('⚠️  Mock verification:', razorpay_payment_id);
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        verified: true,
      },
    });
  } catch (error) {
    console.error('❌ Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
});

/**
 * POST /api/bookings/send-confirmation
 * Send booking confirmation email
 */
app.post('/api/bookings/send-confirmation', async (req, res) => {
  try {
    const { clientName, clientEmail, service, date, time, amount } = req.body;

    if (!clientName || !clientEmail || !service || !date) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking details',
      });
    }

    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #2B4D50 0%, #187c7c 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px; }
    .booking-details { background: white; padding: 15px; border-left: 4px solid #2B4D50; margin: 15px 0; }
    .detail-row { margin: 10px 0; }
    .detail-label { font-weight: bold; color: #2B4D50; }
    .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
    .quote { font-style: italic; color: #666; margin: 15px 0; padding: 10px; border-left: 3px solid #2B4D50; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Booking Confirmed</h1>
      <p>Your evolutionary journey has begun</p>
    </div>
    
    <div class="content">
      <p>Dear <strong>${clientName}</strong>,</p>
      
      <p>Thank you for booking your session with The Evolve Room! Your reservation has been confirmed.</p>
      
      <div class="booking-details">
        <div class="detail-row">
          <span class="detail-label">Service:</span> ${service}
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span> ${formattedDate}
        </div>
        ${time ? `
        <div class="detail-row">
          <span class="detail-label">Time:</span> ${time}
        </div>
        ` : ''}
        ${amount ? `
        <div class="detail-row">
          <span class="detail-label">Amount:</span> ₹${amount.toLocaleString('en-IN')}
        </div>
        ` : ''}
      </div>
      
      <p><strong>Next Steps:</strong></p>
      <ul>
        <li>Our team will contact you within 24 hours to confirm</li>
        <li>Look out for a calendar invite in your email</li>
        <li>If you have questions, reply to this email</li>
      </ul>
      
      <div class="quote">
        "When the inner world transforms, the outer world follows."
      </div>
      
      <p>Warm regards,<br/>
      <strong>The Evolve Room Team</strong></p>
    </div>
    
    <div class="footer">
      <p>&copy; 2026 The Evolve Room. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `;

    if (!emailTransporter) {
      return res.json({
        success: true,
        message: 'Booking confirmed (email service not configured)',
        emailSent: false,
      });
    }

    // Send email
    const info = await emailTransporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@theevolveroom.com',
      to: clientEmail,
      subject: `Booking Confirmed - ${service} - ${formattedDate}`,
      html: emailContent,
    });

    console.log('✓ Confirmation email sent to', clientEmail);
    if (info.response && info.response.includes('Ethereal')) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('📧 Preview email at:', previewUrl);
    }

    res.json({
      success: true,
      message: 'Booking confirmed and confirmation email sent',
      emailSent: true,
      previewUrl: info.response?.includes('Ethereal') ? nodemailer.getTestMessageUrl(info) : undefined,
    });
  } catch (error) {
    console.error('❌ Email error:', error);
    res.json({
      success: true,
      message: 'Booking confirmed (email service had error)',
      emailSent: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend server is running',
  });
});

/**
 * GET /
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    message: 'The Evolve Room Backend Server',
    endpoints: {
      'POST /api/courses/checkout': 'Create Razorpay order',
      'POST /api/courses/verify': 'Verify payment',
      'POST /api/bookings/send-confirmation': 'Send confirmation email',
      'GET /api/health': 'Health check',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('  🚀 Backend Server Running');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log(`  ✓ Server: http://localhost:${PORT}`);
  console.log('');

  if (razorpayInstance) {
    console.log('  ✅ RAZORPAY: Enabled (real orders)');
  } else {
    console.log('  ⚠️  RAZORPAY: Disabled (mock orders)');
  }

  if (emailTransporter) {
    console.log('  ✅ EMAIL: Enabled (confirmations will be sent)');
  } else {
    console.log('  ⚠️  EMAIL: Disabled (test mode only)');
  }

  console.log('');
  console.log('  Endpoints:');
  console.log('    POST /api/courses/checkout');
  console.log('    POST /api/courses/verify');
  console.log('    POST /api/bookings/send-confirmation');
  console.log('    GET  /api/health');
  console.log('');
});
