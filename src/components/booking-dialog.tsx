
'use client';

import * as React from 'react';
import { useState } from 'react';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useRazorpay } from '@/hooks/use-razorpay';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, isToday, isTomorrow } from 'date-fns';
import { Loader2, CheckCircle2, ShieldCheck, CreditCard, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingDialogProps {
  trigger?: React.ReactNode;
  defaultService?: string;
  isPayNow?: boolean;
}

const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export function BookingDialog({ trigger, defaultService = '1:1 Session', isPayNow = false }: BookingDialogProps) {
  const db = useFirestore();
  const { initiateCheckout, isLoading: isCheckoutLoading } = useRazorpay(
    process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001'
  );
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'details' | 'review' | 'payment' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setDate(undefined);
    setTime('');
    setStep('details');
    setLoading(false);
    setEmailSending(false);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'PPP');
  };

  const handleBooking = async () => {
    if (!db || !name || !email || !date || !time) return;

    setLoading(true);
    
    if (isPayNow && step === 'details') {
      // Move to review step
      setTimeout(() => {
        setStep('review');
        setLoading(false);
      }, 500);
      return;
    }

    if (step === 'review') {
      // Move to payment step if payment required
      if (isPayNow) {
        setTimeout(() => {
          setStep('payment');
          setLoading(false);
        }, 500);
      } else {
        // Skip payment and go directly to confirmation
        await saveBookingAndSendEmail();
      }
      return;
    }

    // Handle payment step - trigger Razorpay
    if (isPayNow && step === 'payment') {
      try {
        await initiateCheckout({
          courseId: 'session-' + Date.now(),
          courseName: defaultService,
          amount: 5000, // ₹5,000
          userEmail: email,
          userName: name,
          onSuccess: async (response) => {
            // Payment successful - now save booking
            await saveBookingAndSendEmail(response.razorpay_payment_id);
          },
          onError: (error) => {
            setLoading(false);
            console.error('Payment failed:', error);
          },
        });
      } catch (error) {
        console.error('Checkout error:', error);
        setLoading(false);
      }
      return;
    }
  };

  const saveBookingAndSendEmail = async (paymentId?: string) => {
    try {
      console.log('📝 Saving booking to Firebase...');
      
      if (!db) {
        throw new Error('Firebase not initialized - Database unavailable');
      }

      const bookingData = {
        clientName: name,
        clientEmail: email,
        service: defaultService,
        date: date?.toISOString(),
        time: time,
        status: isPayNow && paymentId ? 'confirmed' : 'pending',
        paymentStatus: paymentId ? 'paid' : 'unpaid',
        razorpayPaymentId: paymentId || null,
        createdAt: new Date().toISOString()
      };

      console.log('📋 Booking data:', bookingData);

      // Timeout for Firebase save (15 seconds)
      const firebasePromise = addDoc(collection(db, 'bookings'), bookingData);
      const firebaseTimeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firebase save timeout (15s)')), 15000)
      );

      try {
        await Promise.race([firebasePromise, firebaseTimeout]);
        console.log('✓ Booking saved to Firebase');
      } catch (firebaseError) {
        console.error('❌ Firebase error:', firebaseError);
        throw new Error(`Firebase Error: ${firebaseError instanceof Error ? firebaseError.message : 'Unknown error'}`);
      }

      // Send confirmation email
      setEmailSending(true);
      console.log('📧 Sending confirmation email to', email);
      
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';
        const emailUrl = `${backendUrl}/api/bookings/send-confirmation`;
        
        console.log('📧 Email endpoint:', emailUrl);

        const emailTimeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Email send timeout (10s)')), 10000)
        );

        const emailPromise = fetch(emailUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientName: name,
            clientEmail: email,
            service: defaultService,
            date,
            time,
            amount: isPayNow ? 5000 : undefined,
          }),
        });

        const emailResponse = await Promise.race([emailPromise, emailTimeout]) as Response;
        
        console.log('📧 Email response status:', emailResponse.status);

        if (!emailResponse.ok) {
          console.warn('⚠️ Email service returned error:', emailResponse.status);
          // Don't throw - email failure shouldn't block booking success
        } else {
          const emailData = await emailResponse.json();
          console.log('✓ Email response:', emailData);
        }
      } catch (emailError) {
        console.warn('⚠️ Email service error (booking still saved):', emailError);
        // Don't throw - email failure shouldn't block the booking
      } finally {
        setEmailSending(false);
      }

      setStep('success');
      setLoading(false);
      console.log('✓ Booking complete - success screen displayed');
    } catch (error) {
      setLoading(false);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Booking error:', errorMessage);
      
      // Show error to user
      alert(`Booking failed: ${errorMessage}\n\nPlease try again or contact support.`);
      
      const permissionError = new FirestorePermissionError({
        path: 'bookings',
        operation: 'create',
        requestResourceData: {},
      });
      errorEmitter.emit('permission-error', permissionError);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
      <DialogTrigger asChild>
        {trigger || <Button>Book Now</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background border-primary/20 p-0 overflow-hidden">
        {step === 'details' && (
          <>
            <div className="bg-primary p-8 text-primary-foreground">
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline tracking-widest uppercase">Reserve Your Space</DialogTitle>
                <DialogDescription className="text-primary-foreground/70">
                  Begin your evolutionary journey with {defaultService}.
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest font-bold">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Chandrika Jayaram" className="rounded-none border-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="rounded-none border-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-bold">Preferred Date</Label>
                  <div className="border border-primary/20 rounded-none bg-background">
                    <input
                      type="date"
                      value={date ? format(date, 'yyyy-MM-dd') : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setDate(new Date(e.target.value));
                        }
                      }}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full px-4 py-2 border-0 rounded-none focus:outline-none focus:ring-0 bg-background text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest font-bold">Preferred Time</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <Button
                        key={slot}
                        variant={time === slot ? 'default' : 'outline'}
                        onClick={() => setTime(slot)}
                        className={cn(
                          'rounded-none h-10',
                          time === slot
                            ? 'bg-primary text-primary-foreground'
                            : 'border-primary/20 hover:bg-gold-subtle'
                        )}
                      >
                        <Clock className="w-3 h-3 mr-2" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleBooking} 
                disabled={loading || !name || !isValidEmail(email) || !date || !time}
                className="w-full bg-primary text-primary-foreground h-14 rounded-none uppercase tracking-widest font-bold"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : "REVIEW BOOKING"}
              </Button>
            </div>
          </>
        )}

        {step === 'review' && (
          <>
            <div className="bg-primary p-8 text-primary-foreground">
              <DialogHeader>
                <DialogTitle className="text-2xl font-headline tracking-widest uppercase">Review Your Booking</DialogTitle>
                <DialogDescription className="text-primary-foreground/70">
                  Please confirm all details are correct
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4 bg-gold-subtle p-6 border border-primary/20 rounded-md">
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Name</span>
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <div className="h-px bg-primary/10" />
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Email</span>
                  <span className="text-sm font-medium">{email}</span>
                </div>
                <div className="h-px bg-primary/10" />
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Service</span>
                  <span className="text-sm font-medium">{defaultService}</span>
                </div>
                <div className="h-px bg-primary/10" />
                <div className="flex justify-between items-start">
                  <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Date & Time</span>
                  <span className="text-sm font-medium">{getDateLabel(date!)} • {time}</span>
                </div>
                {isPayNow && (
                  <>
                    <div className="h-px bg-primary/10" />
                    <div className="flex justify-between items-start">
                      <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Amount</span>
                      <span className="text-lg font-bold text-primary"><span className="currency-symbol">₹</span>5,000</span>
                    </div>
                  </>
                )}
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={handleBooking} 
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground h-14 rounded-none uppercase tracking-widest font-bold"
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : isPayNow ? "PROCEED TO PAYMENT" : "CONFIRM BOOKING"}
                </Button>
                <Button 
                  onClick={() => setStep('details')} 
                  disabled={loading}
                  variant="outline"
                  className="w-full h-12 rounded-none uppercase tracking-widest font-bold border-primary/20"
                >
                  EDIT DETAILS
                </Button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-wider">
                A confirmation email will be sent to {email}
              </p>
            </div>
          </>
        )}

        {step === 'payment' && (
          <div className="p-8 space-y-8 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-headline font-bold uppercase tracking-widest">Secure Checkout</h3>
              <p className="text-sm text-muted-foreground">Session: {defaultService}</p>
              <p className="text-xl font-bold text-primary"><span className="currency-symbol">₹</span>5,000</p>
            </div>
            
            <div className="p-6 border border-primary/10 bg-gold-subtle space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                <span>Total Amount</span>
                <span><span className="currency-symbol">₹</span>5,000.00</span>
              </div>
              <div className="h-px bg-primary/10 w-full" />
              <p className="text-[10px] text-muted-foreground italic">
                Click "Pay Now" to complete your booking securely
              </p>
            </div>

            <Button 
              onClick={handleBooking} 
              disabled={loading || isCheckoutLoading}
              className="w-full bg-primary text-primary-foreground h-14 rounded-none uppercase tracking-widest font-bold"
            >
              {loading || isCheckoutLoading ? <Loader2 className="animate-spin mr-2" /> : "PAY NOW"}
            </Button>
            
            <div className="flex items-center justify-center space-x-2 text-[10px] text-muted-foreground uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" />
              <span>Encrypted Secure Transaction</span>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 text-center space-y-8 animate-in zoom-in duration-500">
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto" />
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-bold uppercase tracking-widest">Confirmed</h3>
              <p className="text-muted-foreground text-sm">
                Your evolutionary journey has begun. <br />
                {emailSending ? (
                  <span className="inline-flex items-center gap-1">Sending confirmation email...</span>
                ) : (
                  <span>Confirmation email has been sent to <strong>{email}</strong></span>
                )}
              </p>
            </div>
            <div className="p-6 bg-gold-subtle border border-primary/10 space-y-3">
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Your booking details</p>
              <p className="text-sm italic font-medium">{defaultService}</p>
              <p className="text-sm">{getDateLabel(date!)} at {time}</p>
              {isPayNow && <p className="text-xs text-muted-foreground">Payment completed</p>}
              <p className="text-[10px] text-muted-foreground pt-2 border-t border-primary/10">
                Our team will contact you within 24 hours to finalize any additional details.
              </p>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/10 text-xs italic text-muted-foreground rounded-md">
              "When the inner world transforms, the outer world follows."
            </div>
            <Button 
              onClick={() => setOpen(false)}
              className="w-full bg-foreground text-background h-14 rounded-none uppercase tracking-widest font-bold"
            >
              CLOSE
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
