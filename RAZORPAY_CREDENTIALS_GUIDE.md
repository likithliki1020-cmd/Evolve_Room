# 🔑 Razorpay Credentials Setup Guide

Complete guide for obtaining and configuring Razorpay API credentials for payment processing.

---

## 📋 Table of Contents

1. [What is Razorpay?](#what-is-razorpay)
2. [Get Credentials (Step-by-Step)](#get-credentials-step-by-step)
3. [Set Environment Variables](#set-environment-variables)
4. [Verify Configuration](#verify-configuration)
5. [Test Payment Flow](#test-payment-flow)
6. [Troubleshooting](#troubleshooting)
7. [Production Setup](#production-setup)
8. [Support](#support)

---

## What is Razorpay?

Razorpay is a payment gateway that allows you to accept payments from customers using credit/debit cards, UPI, and other payment methods. The payment system on this website uses Razorpay to process secure transactions.

**Key Points:**
- PCI-DSS compliant (secure)
- Accepts multiple payment methods
- Real-time transaction processing
- Test mode for development
- Live mode for production

---

## 🔑 Get Credentials (Step-by-Step)

### Step 1: Create Razorpay Account

1. Go to **https://razorpay.com**
2. Click **"Sign Up"** button (top right)
3. Enter your email address
4. Create a strong password
5. Verify your email
6. Complete account setup with:
   - Phone number
   - Business name
   - Business type
   - Website URL (if available)

### Step 2: Access Dashboard

1. Visit **https://dashboard.razorpay.com**
2. Log in with your credentials
3. You'll see the main dashboard

### Step 3: Navigate to API Keys

1. Click **Settings** ⚙️ in the left sidebar
2. Select **API Keys** from the menu
3. You'll see two tabs: **Test** and **Live**

### Step 4: Make Sure You're in Test Mode

**IMPORTANT**: For development/testing, you must use **Test Mode**

1. Look at the top of the API Keys page
2. You'll see a toggle switch that says **Test** and **Live**
3. Ensure the **Test** toggle is selected (it should be blue/active)
4. **DO NOT** use Live Mode credentials for testing!

### Step 5: Copy Your Credentials

In **Test Mode**, you'll see two boxes:

**Box 1: Key ID**
- Looks like: `rzp_test_ABC123XYZ1234567890`
- Starts with `rzp_test_`
- **Copy this entire string**

**Box 2: Key Secret**
- Long random string
- Should NOT be shared publicly
- **Copy this entire string**
- Keep this confidential!

**Example:**
```
Key ID:     rzp_test_ABC123XYZ1234567890
Key Secret: abc1234def5678ghi9012jkl3456mno
```

---

## 📝 Set Environment Variables

### What are Environment Variables?

Environment variables are configuration settings that tell your application where to find the Razorpay API credentials. They're kept separate from your code for security.

### Option 1: Using .env File (Easiest)

1. Open your project folder
2. Look for a file called `.env` in the root directory
3. If it doesn't exist, create a new file called `.env`
4. Add these lines:

```env
RAZORPAY_KEY_ID=rzp_test_ABC123XYZ1234567890
RAZORPAY_KEY_SECRET=abc1234def5678ghi9012jkl3456mno
```

**Important:**
- Replace `rzp_test_ABC123XYZ1234567890` with YOUR Key ID
- Replace `abc1234def5678ghi9012jkl3456mno` with YOUR Key Secret
- Save the file
- Restart the backend server

### Option 2: Using Terminal Commands

If you prefer to set variables in the terminal:

**For macOS/Linux:**
```bash
export RAZORPAY_KEY_ID=rzp_test_ABC123XYZ1234567890
export RAZORPAY_KEY_SECRET=abc1234def5678ghi9012jkl3456mno
npm run test-backend
```

**For Windows (PowerShell):**
```powershell
$env:RAZORPAY_KEY_ID="rzp_test_ABC123XYZ1234567890"
$env:RAZORPAY_KEY_SECRET="abc1234def5678ghi9012jkl3456mno"
npm run test-backend
```

**For Windows (Command Prompt):**
```cmd
set RAZORPAY_KEY_ID=rzp_test_ABC123XYZ1234567890
set RAZORPAY_KEY_SECRET=abc1234def5678ghi9012jkl3456mno
npm run test-backend
```

### Option 3: Using .env.local File

1. Create a file called `.env.local` in your project root
2. Add the same content:

```env
RAZORPAY_KEY_ID=rzp_test_ABC123XYZ1234567890
RAZORPAY_KEY_SECRET=abc1234def5678ghi9012jkl3456mno
```

3. Save and restart backend

---

## ✅ Verify Configuration

### Check if Credentials are Set Correctly

After setting the environment variables and restarting the backend, look for this message:

```
═══════════════════════════════════════════════════════
  🚀 Razorpay Test Backend Server
═══════════════════════════════════════════════════════

  ✓ Server running on http://localhost:3001

  ✅ RAZORPAY API INITIALIZED
     Real Razorpay orders will be created
```

### If You See This Instead:

```
⚠️  RAZORPAY NOT CONFIGURED
   To create real Razorpay orders, set environment variables:
```

**This means:**
- ❌ Environment variables are NOT set
- ❌ Credentials are not being read
- ⚙️ **Action needed**: Set the env vars following Option 1, 2, or 3 above

---

## 🧪 Test Payment Flow

### Complete Testing Process

Once credentials are configured (you see ✅ RAZORPAY API INITIALIZED):

1. **Start Backend Server**
   ```bash
   npm run test-backend
   ```
   Should show ✅ RAZORPAY API INITIALIZED

2. **Start Frontend Server** (in new terminal)
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Go to `http://localhost:9002`
   - Or your configured frontend URL

4. **Test Course Enrollment**
   - Click on **Courses** page
   - Click **"Enroll Now"** on any course
   - Fill in:
     - Full Name
     - Email Address
     - Preferred Date (pick a future date)
   - Click **"Proceed to Payment"**
   - Click **"PAY NOW"**

5. **Razorpay Modal Opens**
   - Modal shows course details
   - Shows amount in INR (₹)

6. **Enter Test Card Details**
   - Card Number: `4111 1111 1111 1111`
   - Expiry: Any future date (e.g., 12/25)
   - CVV: Any 3 digits (e.g., 123)
   - Name: Any name

7. **Complete Payment**
   - Click **"Pay"** button
   - You should see: ✅ Success message

8. **Verification**
   - Check backend logs for: `✓ Real Razorpay order created: order_ABC...`
   - Check browser for success confirmation

---

## 🔍 Verify Orders Were Created

### Check Backend Logs

In the terminal where backend is running, look for entries like:

**Successful Creation:**
```
✓ Real Razorpay order created: order_JHY834hjbdNHT7
✓ Payment signature verified: pay_JHY834hjbdNHT7
```

**Failed (Wrong Credentials):**
```
⚠️  Using mock order ID (install razorpay and set env vars for real orders): order_abc123
```

---

## ❌ Troubleshooting

### Problem 1: Still Getting "order_XXX is not a valid id" Error

**Cause:** Environment variables are not set or not recognized

**Solutions:**
1. Double-check the environment variable names:
   - `RAZORPAY_KEY_ID` (not `RAZORPAY_ID`)
   - `RAZORPAY_KEY_SECRET` (not `RAZORPAY_SECRET`)

2. Verify credentials are correct:
   - Key ID should start with `rzp_test_` for testing
   - Key Secret should be a long random string

3. Restart backend completely:
   - Stop current backend (`Ctrl+C`)
   - Start again: `npm run test-backend`
   - Look for ✅ message

4. Try using `.env` file instead of terminal commands

### Problem 2: Backend Shows "RAZORPAY NOT CONFIGURED"

**Cause:** Razorpay package not installed or env vars missing

**Solutions:**
```bash
# Install razorpay package
npm install razorpay

# Set environment variables (choose one method)
# Then restart: npm run test-backend
```

### Problem 3: "Unable to find credentials" Error

**Cause:** Environment variables not found

**Solutions:**
1. Verify `.env` file exists in project root
2. Verify file contains both lines:
   ```env
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=...
   ```
3. No quotes around values in `.env` file
4. Restart backend after making changes

### Problem 4: Different Order ID Each Time

**This is NORMAL!** Each transaction creates a new order ID. This is expected behavior.

### Problem 5: Can't Find Settings → API Keys

1. Make sure you're logged into Razorpay
2. Ensure you're on `https://dashboard.razorpay.com`
3. Click profile icon (top right) → Settings
4. Look for "API Keys" in the left menu
5. If not visible, scroll down the menu

---

## 🚀 Production Setup

### When Moving to Live Payments

**IMPORTANT:** Only do this when you're ready for real payments!

1. **Switch to Live Mode on Razorpay Dashboard**
   - Click the **Live** toggle (top of API Keys page)
   - You'll see different credentials starting with `rzp_live_`

2. **Get Live Credentials**
   - Copy the **Live Mode** Key ID and Key Secret
   - These are different from Test Mode credentials

3. **Update Environment Variables**
   - Replace test credentials with live credentials
   - Keep the same environment variable names:
     ```env
     RAZORPAY_KEY_ID=rzp_live_ABC123XYZ...
     RAZORPAY_KEY_SECRET=live_secret_key...
     ```

4. **Update Backend URL**
   - Change `NEXT_PUBLIC_BACKEND_API_URL` to your production server
   - Example: `https://your-domain.com/api`

5. **Deploy**
   - Deploy frontend and backend with new credentials
   - Test with small amount first

### Safety Checklist

- [ ] Credentials switched to Live Mode
- [ ] Backend URL points to production server
- [ ] Frontend environment variables updated
- [ ] HTTPS enabled on production server
- [ ] Tested with small transaction
- [ ] Webhook handlers configured
- [ ] Error logging enabled
- [ ] Support team trained on payments

---

## Where to Find Help

### Razorpay Resources
- **Dashboard**: https://dashboard.razorpay.com
- **Documentation**: https://razorpay.com/docs/
- **API Reference**: https://razorpay.com/docs/api/
- **Test Cards**: https://razorpay.com/docs/payments/test-card-details/
- **Support**: https://support.razorpay.com

### Common Test Cards

**For Testing Success:**
- Card Number: `4111 1111 1111 1111`
- Card Type: Visa
- Status: Success

**For Testing Failure:**
- Card Number: `4111 1111 1111 1110`
- Card Type: Visa
- Status: Failure

**For 3D Secure:**
- Card Number: `4366 0061 1050 0016`
- OTP: 000000 (when prompted)

### Quick Reference

```
Test Mode Key ID Format:      rzp_test_XXXXXXXXXXXXXX
Live Mode Key ID Format:      rzp_live_XXXXXXXXXXXXXX
Test Mode Key Secret Format:  12345abcde67890fghij...
Live Mode Key Secret Format:  abcdef1234567890ghij...
```

---

## 📞 Support

### If You Need Help

1. **Check This Guide** - Read through troubleshooting section
2. **Razorpay Support** - Visit https://support.razorpay.com
3. **Developer Docs** - Check https://razorpay.com/docs/
4. **Contact Admin** - Reach out to your application administrator

### What Information to Share with Support

When asking for help, include:
- Error message (exact text)
- Screenshot of error
- Which step you're on
- Terminal output (if applicable)
- Whether you're in Test or Live mode

---

## ✅ Checklist

- [ ] Created Razorpay account
- [ ] Navigated to Settings → API Keys
- [ ] Verified Test Mode is active
- [ ] Copied Key ID (starts with `rzp_test_`)
- [ ] Copied Key Secret
- [ ] Set environment variables (choose one method)
- [ ] Restarted backend server
- [ ] See ✅ RAZORPAY API INITIALIZED message
- [ ] Tested payment with test card
- [ ] Saw successful order creation in logs

---

**Status**: Ready to accept payments ✅  
**Last Updated**: June 17, 2026  
**Version**: 1.0.0

---

## Quick Reference Links

| What | Where |
|------|-------|
| Create Account | https://razorpay.com |
| Access Dashboard | https://dashboard.razorpay.com |
| Get API Keys | Settings → API Keys (in dashboard) |
| View Docs | https://razorpay.com/docs/ |
| Test Cards | https://razorpay.com/docs/payments/test-card-details/ |
| Support | https://support.razorpay.com |

---

**For questions, refer to this guide or contact Razorpay support directly.**
