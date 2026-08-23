/**
 * Example Razorpay Backend Implementation (Node.js + Express + TypeScript)
 * 
 * This is a reference implementation for the required backend endpoints.
 * Adjust based on your database schema and authentication system.
 * 
 * Installation:
 * npm install razorpay express cors dotenv
 * npm install --save-dev @types/express @types/node typescript ts-node
 */

import express, { Request, Response } from 'express';
import cors from 'cors';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:9002',
  credentials: true,
}));
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// ============================================================
// Mock Database (replace with your actual database)
// ============================================================

interface Course {
  id: string;
  name: string;
  price: number; // in INR
}

interface Payment {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  courseId: string;
  userId: string;
  amount: number;
  status: 'verified' | 'failed' | 'pending';
  createdAt: Date;
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  paymentId: string;
  status: 'active' | 'inactive';
  enrolledAt: Date;
}

// Simulated database
const courses: Course[] = [
  { id: 'life-coaching-mastery', name: 'Life Coaching Mastery', price: 45000 },
  { id: 'hooponopono-intensive', name: 'Ho\'oponopono Intensive', price: 12000 },
  { id: 'eft-anxiety', name: 'EFT for Anxiety', price: 8500 },
  { id: 'nlp-practitioner', name: 'NLP Practitioner', price: 35000 },
  { id: 'chakra-alignment', name: 'Chakra Alignment', price: 9900 },
  { id: 'graphology', name: 'Subconscious Graphology', price: 15000 },
];

const payments: Payment[] = [];
const enrollments: Enrollment[] = [];

// ============================================================
// Authentication Middleware (implement your own)
// ============================================================

interface AuthRequest extends Request {
  userId?: string;
}

const authenticate = (req: AuthRequest, res: Response, next: () => void) => {
  // In production, verify JWT token or session
  // For now, we'll use a simple user ID from headers
  const userId = req.headers['x-user-id'] as string;
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.userId = userId;
  next();
};

// ============================================================
// Endpoints
// ============================================================

/**
 * POST /api/courses/checkout
 * Create a Razorpay order for course enrollment
 */
app.post('/api/courses/checkout', async (req: Request, res: Response) => {
  try {
    const { courseId, amount, currency = 'INR' } = req.body;

    // Validate input
    if (!courseId || !amount) {
      return res.status(400).json({
        error: 'courseId and amount are required',
      });
    }

    // Find course in database
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return res.status(404).json({
        error: 'Course not found',
      });
    }

    // Verify amount matches course price
    if (amount !== course.price) {
      return res.status(400).json({
        error: 'Amount does not match course price',
      });
    }

    // Create Razorpay order
    // Note: amount is in paise (₹1 = 100 paise)
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: currency,
      receipt: `course_${courseId}_${Date.now()}`,
      notes: {
        courseId: courseId,
        courseName: course.name,
      },
      payment_capture: 1, // Auto-capture payment
    });

    console.log('Order created:', order.id);

    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      course: {
        id: course.id,
        name: course.name,
      },
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/courses/verify
 * Verify Razorpay payment and create enrollment
 * Requires authentication in production
 */
app.post(
  '/api/courses/verify',
  authenticate as any,
  async (req: AuthRequest, res: Response) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        courseId,
      } = req.body;

      // Validate input
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: 'Missing payment details',
        });
      }

      // ========================================================
      // CRITICAL: Verify Razorpay Signature
      // ========================================================
      // This prevents payment tampering
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generated_signature = hmac.digest('hex');

      if (generated_signature !== razorpay_signature) {
        console.warn('Invalid signature:', {
          provided: razorpay_signature,
          generated: generated_signature,
        });
        return res.status(400).json({
          success: false,
          message: 'Invalid payment signature - Fraud detected!',
        });
      }

      console.log('Payment signature verified:', razorpay_payment_id);

      // ========================================================
      // Fetch payment details from Razorpay to double-check
      // ========================================================
      const payment = await razorpay.payments.fetch(razorpay_payment_id);

      if (payment.status !== 'captured') {
        return res.status(400).json({
          success: false,
          message: `Payment not captured. Status: ${payment.status}`,
        });
      }

      // ========================================================
      // Create Payment Record
      // ========================================================
      const paymentRecord: Payment = {
        id: `payment_${Date.now()}`,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        courseId,
        userId: req.userId!,
        amount: payment.amount / 100, // Convert from paise to INR
        status: 'verified',
        createdAt: new Date(),
      };

      payments.push(paymentRecord);
      console.log('Payment saved:', paymentRecord.id);

      // ========================================================
      // Create Enrollment Record
      // ========================================================
      const enrollment: Enrollment = {
        id: `enrollment_${Date.now()}`,
        userId: req.userId!,
        courseId,
        paymentId: paymentRecord.id,
        status: 'active',
        enrolledAt: new Date(),
      };

      enrollments.push(enrollment);
      console.log('Enrollment created:', enrollment.id);

      // ========================================================
      // Success Response
      // ========================================================
      res.json({
        success: true,
        message: 'Payment verified and course enrollment created',
        data: {
          paymentId: razorpay_payment_id,
          enrollmentId: enrollment.id,
          courseId,
          enrolledAt: enrollment.enrolledAt,
        },
      });

      // ========================================================
      // Optional: Send confirmation email
      // ========================================================
      // await sendEnrollmentEmail({
      //   email: user.email,
      //   courseName: course.name,
      //   paymentId: razorpay_payment_id,
      // });

    } catch (error) {
      console.error('Verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Payment verification failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
);

/**
 * Optional: GET /api/enrollments
 * Fetch user's enrollments
 */
app.get('/api/enrollments', authenticate as any, (req: AuthRequest, res: Response) => {
  try {
    const userEnrollments = enrollments.filter((e) => e.userId === req.userId);
    res.json({
      success: true,
      data: userEnrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch enrollments',
    });
  }
});

/**
 * Optional: GET /api/payments
 * Fetch user's payments
 */
app.get('/api/payments', authenticate as any, (req: AuthRequest, res: Response) => {
  try {
    const userPayments = payments.filter((p) => p.userId === req.userId);
    res.json({
      success: true,
      data: userPayments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payments',
    });
  }
});

/**
 * Optional: Razorpay Webhook Handler
 * For async payment verification and status updates
 */
app.post('/api/webhooks/razorpay', (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;

    // Verify webhook signature
    const body = JSON.stringify(req.body);
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
    hmac.update(body);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== signature) {
      console.warn('Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const { event, payload } = req.body;

    console.log('Webhook event:', event);

    // Handle different webhook events
    switch (event) {
      case 'payment.authorized':
        console.log('Payment authorized:', payload.payment.entity.id);
        break;

      case 'payment.failed':
        console.log('Payment failed:', payload.payment.entity.id);
        // Update payment status to 'failed' in database
        break;

      case 'payment.captured':
        console.log('Payment captured:', payload.payment.entity.id);
        // Update payment status to 'captured'
        break;

      default:
        console.log('Unknown event:', event);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// ============================================================
// Start Server
// ============================================================

app.listen(port, () => {
  console.log(`✓ Server running on http://localhost:${port}`);
  console.log(`✓ Razorpay Key ID: ${process.env.RAZORPAY_KEY_ID}`);
  console.log('');
  console.log('Available endpoints:');
  console.log('  POST /api/courses/checkout');
  console.log('  POST /api/courses/verify');
  console.log('  GET  /api/enrollments');
  console.log('  GET  /api/payments');
  console.log('  POST /api/webhooks/razorpay');
});

// ============================================================
// Export for testing
// ============================================================
export default app;
