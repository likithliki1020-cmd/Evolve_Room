# Razorpay Integration Setup Guide

This guide walks you through setting up the Razorpay payment integration in your Next.js application.

## 1. Environment Variables Setup

Add the following to your `.env.local` file:

```env
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
NEXT_PUBLIC_RAZORPAY_THEME_COLOR=#4F46E5
NEXT_PUBLIC_BRAND_LOGO=https://your-domain.com/logo.png
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
```

### Getting Your Razorpay Credentials

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to Settings → API Keys
3. Copy your **Key ID** and **Key Secret**
4. Add the Key ID to `NEXT_PUBLIC_RAZORPAY_KEY_ID`

## 2. Backend API Endpoints Required

Your backend must implement two endpoints:

### Endpoint 1: Create Order
- **URL**: `/api/courses/checkout`
- **Method**: `POST`
- **Request Body**:
```json
{
  "courseId": "string",
  "amount": 35000,
  "currency": "INR"
}
```
- **Response**:
```json
{
  "order_id": "razorpay_order_id_here",
  "amount": 35000,
  "currency": "INR"
}
```

### Endpoint 2: Verify Payment
- **URL**: `/api/courses/verify`
- **Method**: `POST`
- **Request Body**:
```json
{
  "razorpay_order_id": "string",
  "razorpay_payment_id": "string",
  "razorpay_signature": "string",
  "courseId": "string"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Payment verified successfully"
}
```

## 3. Backend Implementation Example (Node.js + Express)

```typescript
import crypto from 'crypto';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Create Order Endpoint
app.post('/api/courses/checkout', async (req, res) => {
  try {
    const { courseId, amount, currency = 'INR' } = req.body;

    // Validate course exists in your database
    const course = await db.courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: currency,
      receipt: `course_${courseId}_${Date.now()}`,
      notes: {
        courseId: courseId,
        courseName: course.name,
      },
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify Payment Endpoint
app.post('/api/courses/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId,
    } = req.body;

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    // Payment verified successfully
    // Now save enrollment in your database
    const payment = await db.payments.create({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      courseId,
      userId: req.user.id, // From authentication context
      status: 'verified',
      createdAt: new Date(),
    });

    // Create course enrollment
    await db.enrollments.create({
      userId: req.user.id,
      courseId,
      paymentId: payment.id,
      status: 'active',
      enrolledAt: new Date(),
    });

    res.json({
      success: true,
      message: 'Payment verified and enrollment created',
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
});
```

## 4. Integration in React/Next.js Pages

### Option 1: Using the RazorpayCheckoutButton Component

```tsx
import { RazorpayCheckoutButton } from '@/components/razorpay-checkout-button';

export default function CoursePage() {
  return (
    <RazorpayCheckoutButton
      courseId="nlp-practitioner"
      courseName="NLP Practitioner"
      amount={35000}
      userEmail="user@example.com"
      userName="John Doe"
      backendApiUrl={process.env.NEXT_PUBLIC_BACKEND_API_URL!}
      onSuccess={(paymentId) => {
        // Handle success
        alert(`Payment successful: ${paymentId}`);
      }}
      onError={(error) => {
        console.error('Payment failed:', error);
      }}
    />
  );
}
```

### Option 2: Using the useRazorpay Hook Directly

```tsx
import { useRazorpay } from '@/hooks/use-razorpay';

export default function CustomCheckout() {
  const { initiateCheckout, isLoading, error } = useRazorpay(
    process.env.NEXT_PUBLIC_BACKEND_API_URL!
  );

  return (
    <button
      onClick={() =>
        initiateCheckout({
          courseId: 'course-123',
          courseName: 'My Course',
          amount: 35000,
          userEmail: 'user@example.com',
          userName: 'John Doe',
        })
      }
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
```

## 5. Handling Authentication

Currently, the courses page uses dummy user data. For production:

```tsx
import { useUser } from '@/firebase/auth/use-user'; // Your auth hook

export default function CoursesPage() {
  const { user } = useUser();

  if (!user) {
    return <div>Please log in to enroll</div>;
  }

  return (
    <RazorpayCheckoutButton
      courseId="course-123"
      courseName="Course Name"
      amount={35000}
      userEmail={user.email}
      userName={user.displayName || 'User'}
      backendApiUrl={process.env.NEXT_PUBLIC_BACKEND_API_URL!}
    />
  );
}
```

## 6. Testing in Development

### Using Razorpay Test Mode

Razorpay provides test credentials. Use these test card details:

**Success Case:**
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

**Failure Case:**
- Card Number: `4111 1111 1111 1110`
- Expiry: Any future date
- CVV: Any 3 digits

### Test Amounts

You can use any amount in test mode - no real charges are made.

## 7. Security Considerations

1. **Never** commit `.env.local` to git
2. **Always** verify signatures on the backend
3. **Never** expose `RAZORPAY_KEY_SECRET` in frontend code
4. Use HTTPS in production
5. Implement rate limiting on payment verification endpoint
6. Add CORS configuration to allow only your frontend domain

## 8. Error Handling

The code handles these error scenarios:

- Script loading failures
- Network errors during order creation
- Payment verification failures
- User cancellations
- Invalid payment signatures

All errors display user-friendly messages through the AlertDialog component.

## 9. Troubleshooting

### Script not loading
- Check if Razorpay domain is not blocked
- Verify internet connection
- Check browser console for errors

### Payment verification failing
- Verify `RAZORPAY_KEY_SECRET` is correct
- Ensure backend endpoint is accessible
- Check CORS settings if on different domains

### Amount issues
- Note: All amounts in the API are in **paise** (₹1 = 100 paise)
- Frontend amounts should be in INR (₹), handled by the hook

## 10. Production Checklist

- [ ] Set up real Razorpay account
- [ ] Get production API keys
- [ ] Update environment variables
- [ ] Test with real payments (small amounts)
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up database for storing payments
- [ ] Implement webhook handlers for async verification
- [ ] Add email notifications on successful enrollment
- [ ] Monitor payment success rates
- [ ] Set up error logging/monitoring
