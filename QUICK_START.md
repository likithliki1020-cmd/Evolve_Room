# 🚀 Quick Start Guide - Razorpay Testing

This guide helps you get the Razorpay integration working locally for testing.

## ⚡ 2-Minute Quick Start

### Step 1: Verify Environment Variables
Make sure your `.env.local` has:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
NEXT_PUBLIC_RAZORPAY_THEME_COLOR=#4F46E5
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
```

If you don't have `RAZORPAY_KEY_ID`, get one from: https://dashboard.razorpay.com

### Step 2: Start Test Backend Server

**Option A: Using Node.js directly**
```bash
cd /Users/911neo/Desktop/project_2026/project
node test-backend-server.js
```

**Option B: Using npm (if installed)**
```bash
npm run test-backend
# (You may need to add this to package.json scripts)
```

You should see:
```
═══════════════════════════════════════════════════════
  🚀 Razorpay Test Backend Server
═══════════════════════════════════════════════════════

  ✓ Server running on http://localhost:3001

  Available endpoints:
    POST http://localhost:3001/api/courses/checkout
    POST http://localhost:3001/api/courses/verify
    GET  http://localhost:3001/api/health
```

### Step 3: Start Frontend Development Server

**In a new terminal**:
```bash
cd /Users/911neo/Desktop/project_2026/project
npm run dev
```

### Step 4: Test the Payment Flow

1. Open **http://localhost:3002** (or your configured port)
2. Go to **Courses** page
3. Click **"Enroll Now"** on any course
4. Fill the form and proceed with Razorpay checkout
5. Use test card: **4111 1111 1111 1111**
6. Click Pay → Success!

## 🔧 Troubleshooting

### Error: "Failed to fetch"
- ❌ Backend not running
- ✅ Solution: Start the test backend server first

### Error: "Cannot connect to backend at http://localhost:3001"
- ❌ Wrong port
- ❌ Backend running on different port
- ✅ Check `.env.local` `NEXT_PUBLIC_BACKEND_API_URL`

### Error: "RAZORPAY_KEY_ID is invalid"
- ❌ Using a non-test key
- ✅ Go to https://dashboard.razorpay.com and copy Key ID from test mode

### Port 3001 already in use
Change the port in `test-backend-server.js`:
```javascript
const PORT = 3002; // Change this to available port
```

And update `.env.local`:
```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3002
```

## 📋 Complete Terminal Commands

### Terminal 1: Backend
```bash
cd /Users/911neo/Desktop/project_2026/project
node test-backend-server.js
```

### Terminal 2: Frontend
```bash
cd /Users/911neo/Desktop/project_2026/project
npm run dev
```

Then open **http://localhost:9002** (adjust if different)

## ✅ Testing Workflow

1. **Create Order** ← Backend receives POST to `/api/courses/checkout`
2. **Open Razorpay Modal** ← Frontend shows Razorpay checkout
3. **Enter Test Card** → 4111 1111 1111 1111 (any expiry, any CVV)
4. **Verify Payment** ← Backend receives POST to `/api/courses/verify`
5. **Save Booking** → Booking saved to Firebase with payment details
6. **Show Success** ← "Confirmed" screen appears

## 🎯 What Happens Behind the Scenes

```
Frontend                    Backend
   │                           │
   ├─[Click Pay]──────────────>│
   │                           │
   │<────Create Order──────────┤
   │     (order_id)            │
   │                           │
   ├─[Open Razorpay Modal]    │
   │                           │
   ├─[Enter Card Details]     │
   │                           │
   ├─[Razorpay Processes]     │
   │                           │
   ├─[Verify Payment]─────────>│
   │  (payment_id, signature)  │
   │                           │
   │<───Success Response───────┤
   │                           │
   ├─[Save to Firebase]       │
   │                           │
   └─[Show Confirmation]      │
```

## 🚀 Moving to Production

Once testing is complete:

1. **Deploy Backend** to your server (AWS, Heroku, etc.)
2. **Get Real Razorpay Keys** from production dashboard
3. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
   NEXT_PUBLIC_BACKEND_API_URL=https://your-backend.com
   ```
4. **Deploy Frontend** with new variables
5. **Test with Small Amount** before going live

## 📞 Need Help?

- Backend errors? Check `test-backend-server.js` console logs
- Frontend errors? Check browser console (F12)
- Razorpay issues? Check [Razorpay Documentation](https://razorpay.com/docs/)

---

**Status**: Ready to test locally ✅  
**Next**: Start the backend server in your terminal
