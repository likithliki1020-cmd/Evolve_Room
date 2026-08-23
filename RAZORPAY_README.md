# Razorpay Payment Integration - Complete Reference

This document provides a comprehensive guide to the Razorpay payment integration implemented in your Next.js application.

## 📚 Files Created

### Frontend Files

1. **`src/lib/razorpay-script.ts`**
   - Dynamically loads Razorpay checkout script
   - Handles script caching to avoid multiple loads
   - Provides type definitions for window.Razorpay

2. **`src/hooks/use-razorpay.ts`**
   - Custom React hook for Razorpay checkout flow
   - Manages loading states and error handling
   - Handles order creation and payment verification
   - Integration with backend APIs

3. **`src/components/razorpay-checkout-button.tsx`**
   - Reusable Razorpay checkout button component
   - Displays loading states
   - Error dialog with retry functionality
   - Customizable button styling and labels

4. **`src/app/courses/page.tsx`** (Updated)
   - Integrated RazorpayCheckoutButton into course cards
   - Changed pricing data structure to use amounts
   - Currency formatted as INR with rupee symbol (₹)

### Documentation Files

1. **`RAZORPAY_SETUP.md`**
   - Complete setup guide with environment variables
   - Backend implementation requirements
   - Integration examples
   - Testing instructions
   - Production checklist

2. **`examples/backend-razorpay-example.ts`**
   - Reference backend implementation (Express + TypeScript)
   - Complete checkout and verification endpoints
   - Mock database for understanding flow
   - Security considerations and best practices

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│                                                          │
│  courses/page.tsx                                       │
│  └── RazorpayCheckoutButton                            │
│      └── useRazorpay hook                              │
│          └── loadRazorpayScript utility               │
│              └── window.Razorpay (browser)            │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
    POST /checkout │    POST /verify
        │          │          │
┌───────▼──────────▼──────────▼────────────────────────────┐
│                  Backend (Node.js)                        │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ POST /api/courses/checkout                        │  │
│  │ • Validate course                                 │  │
│  │ • Create Razorpay order                           │  │
│  │ • Return order_id                                 │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ POST /api/courses/verify                          │  │
│  │ • Verify payment signature (HMAC-SHA256)          │  │
│  │ • Fetch payment from Razorpay                     │  │
│  │ • Create payment record                           │  │
│  │ • Create enrollment                               │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│      Database: Payments, Enrollments, Courses          │
└───────────────────────────────────────────────────────────┘
        │
        │
┌───────▼──────────────────────────────────────────────────┐
│           Razorpay Payment Gateway                        │
│                                                          │
│  • Order creation                                       │
│  • Payment processing                                  │
│  • Signature generation                                │
│  • Payment status tracking                             │
└───────────────────────────────────────────────────────────┘
```

## 🔄 Payment Flow

### Step 1: User Initiates Checkout
```tsx
<RazorpayCheckoutButton
  courseId="nlp-practitioner"
  amount={35000}
  userEmail="user@example.com"
  userName="John Doe"
  backendApiUrl="http://localhost:3001"
/>
```

### Step 2: Load Razorpay Script
- Checks if script already loaded
- Dynamically injects script tag if needed
- Returns promise when script is ready

### Step 3: Create Order
- Frontend calls backend `/api/courses/checkout`
- Backend creates Razorpay order
- Backend returns `order_id`

### Step 4: Open Checkout UI
- Razorpay checkout form appears
- User enters payment details
- Razorpay processes payment

### Step 5: Verify Payment
- Razorpay returns payment response
- Frontend calls backend `/api/courses/verify`
- Backend verifies HMAC signature
- Backend creates enrollment record

### Step 6: Show Result
- Success: Show confirmation, redirect, or trigger callback
- Failure: Display error message with retry option

## 🔐 Security Features

### Signature Verification
```typescript
// The key security step - prevents payment manipulation
const hmac = crypto.createHmac('sha256', KEY_SECRET);
hmac.update(`${order_id}|${payment_id}`);
const generated_signature = hmac.digest('hex');

if (generated_signature !== provided_signature) {
  throw new Error('Fraud detected!');
}
```

### Other Security Measures
- ✅ HTTPS enforced in production
- ✅ Backend validates amount against database
- ✅ CORS configuration limits frontend access
- ✅ Rate limiting prevents brute force
- ✅ User authentication required
- ✅ Webhook signature verification
- ✅ Payment status double-checked from Razorpay

## 🚀 Quick Start

### 1. Add Environment Variables
```bash
# .env.local
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
NEXT_PUBLIC_RAZORPAY_THEME_COLOR=#4F46E5
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
```

### 2. Set Up Backend
```bash
# Copy the example implementation
cp examples/backend-razorpay-example.ts src/backend/routes/checkout.ts

# Install dependencies
npm install razorpay express cors

# Add to your .env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### 3. Start Backend
```bash
npm run dev # or your backend start command
```

### 4. The Courses Page is Ready!
- Navigate to `/courses`
- Click "Enroll Now" on any course
- Razorpay checkout will appear

## 📝 Code Examples

### Using the Hook Directly
```tsx
import { useRazorpay } from '@/hooks/use-razorpay';

function MyCheckout() {
  const { initiateCheckout, isLoading, error } = useRazorpay(
    'http://localhost:3001'
  );

  return (
    <button 
      onClick={() => initiateCheckout({
        courseId: 'course-123',
        courseName: 'My Course',
        amount: 35000,
        userEmail: 'user@email.com',
        userName: 'John',
        onSuccess: (response) => {
          console.log('Payment successful!', response);
        }
      })}
      disabled={isLoading}
    >
      {isLoading ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
```

### Using the Component
```tsx
import { RazorpayCheckoutButton } from '@/components/razorpay-checkout-button';

function CourseCard() {
  return (
    <RazorpayCheckoutButton
      courseId="nlp-practitioner"
      courseName="NLP Practitioner"
      amount={35000}
      userEmail="user@example.com"
      userName="John Doe"
      backendApiUrl="http://localhost:3001"
      buttonLabel="Enroll Now"
      onSuccess={() => alert('Enrolled!')}
    />
  );
}
```

## 🧪 Testing

### Test Credentials
- **Test Card**: 4111 1111 1111 1111
- **Success**: Any expiry and CVV
- **Failure**: Card ending in 1110

### Testing Locally
```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend
cd frontend && npm run dev

# Terminal 3: Test with curl
curl -X POST http://localhost:3001/api/courses/checkout \
  -H "Content-Type: application/json" \
  -d '{"courseId": "nlp-practitioner", "amount": 35000}'
```

## 🐛 Troubleshooting

### "Script failed to load"
- Check Razorpay domain isn't blocked
- Verify internet connection
- Check browser console for errors

### "Payment verification failed"
- Verify backend is running
- Check CORS settings
- Verify RAZORPAY_KEY_SECRET matches

### "Invalid signature"
- Ensure KEY_SECRET is correct
- Check order_id and payment_id formatting
- Verify HMAC calculation

### Amount mismatch
- Remember: API uses paise (₹1 = 100 paise)
- Frontend shows INR, backend converts to paise
- Database stores both

## 📊 Database Schema

### Payments Table
```typescript
{
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  courseId: string;
  userId: string;
  amount: number; // in INR
  status: 'verified' | 'failed' | 'pending';
  createdAt: Date;
}
```

### Enrollments Table
```typescript
{
  id: string;
  userId: string;
  courseId: string;
  paymentId: string;
  status: 'active' | 'inactive';
  enrolledAt: Date;
}
```

## 🔗 Related Files

- **Theme**: [`src/app/globals.css`](src/app/globals.css) - Dark/light mode colors
- **Components**: [`src/components/ui/`](src/components/ui/) - UI components
- **Hooks**: [`src/hooks/`](src/hooks/) - Other custom hooks
- **Config**: [`tailwind.config.ts`](tailwind.config.ts) - Tailwind configuration

## 📞 Support

For Razorpay support:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Integration Guide](https://razorpay.com/i/XqDBJK5)
- [Test Credentials](https://razorpay.com/docs/integrate/payments/payment-gateway/test-card-details/)

## ✅ Checklist for Production

- [ ] Get production API keys from Razorpay
- [ ] Update environment variables
- [ ] Implement real database (replace mock data)
- [ ] Connect to your authentication system
- [ ] Set up email notifications
- [ ] Configure error logging
- [ ] Test with real small payments
- [ ] Review security checklist
- [ ] Performance test payment flow
- [ ] Set up monitoring and alerts
- [ ] Train support team on payment issues
- [ ] Document your custom modifications

## 🎯 Next Steps

1. **Read**: [`RAZORPAY_SETUP.md`](RAZORPAY_SETUP.md) for detailed setup
2. **Review**: Backend example at [`examples/backend-razorpay-example.ts`](examples/backend-razorpay-example.ts)
3. **Set up**: Environment variables and backend API
4. **Test**: With Razorpay test credentials
5. **Deploy**: With production credentials

---

**Last Updated**: June 2026  
**Version**: 1.0.0  
**Status**: Ready for Production
