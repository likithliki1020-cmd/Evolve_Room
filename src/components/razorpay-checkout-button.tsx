'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import { useRazorpay, RazorpayCheckoutOptions } from '@/hooks/use-razorpay';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

/**
 * RazorpayCheckoutButton Component
 * 
 * A reusable button component that handles Razorpay payment flow.
 * Includes loading states, error handling, and user feedback.
 * 
 * Props:
 * - courseId: Unique course identifier
 * - courseName: Display name of the course
 * - amount: Price in INR (e.g., 35000 for ₹35,000)
 * - userEmail: User's email for pre-fill
 * - userName: User's name for pre-fill
 * - backendApiUrl: Base URL of backend API
 * - onSuccess: Callback when payment succeeds
 * - onError: Callback when payment fails
 * - className: Additional button styling
 * 
 * @example
 * ```tsx
 * <RazorpayCheckoutButton
 *   courseId="nlp-practitioner"
 *   courseName="NLP Practitioner"
 *   amount={35000}
 *   userEmail="user@example.com"
 *   userName="John Doe"
 *   backendApiUrl="http://localhost:3001"
 *   onSuccess={() => router.push('/dashboard')}
 * />
 * ```
 */
interface RazorpayCheckoutButtonProps {
  courseId: string;
  courseName: string;
  amount: number;
  userEmail: string;
  userName: string;
  backendApiUrl: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: Error) => void;
  className?: string;
  buttonLabel?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const RazorpayCheckoutButton: React.FC<
  RazorpayCheckoutButtonProps
> = ({
  courseId,
  courseName,
  amount,
  userEmail,
  userName,
  backendApiUrl,
  onSuccess,
  onError,
  className,
  buttonLabel = 'Enroll Now',
  variant = 'link',
  size = 'default',
}) => {
  const { initiateCheckout, isLoading, error, clearError } =
    useRazorpay(backendApiUrl);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleCheckout = async () => {
    try {
      await initiateCheckout({
        courseId,
        courseName,
        amount,
        userEmail,
        userName,
        onSuccess: (response) => {
          onSuccess?.(response.razorpay_payment_id);
        },
        onError: (err) => {
          onError?.(err);
          setShowErrorDialog(true);
        },
      });
    } catch (err) {
      console.error('Checkout error:', err);
      setShowErrorDialog(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        variant={variant}
        size={size}
        className={className}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            {buttonLabel}
            {variant === 'link' && <span className="ml-2">→</span>}
          </>
        )}
      </Button>

      {/* Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Payment Failed
            </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground">
              {error || 'An error occurred during checkout. Please try again.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-4">
            <AlertDialogCancel onClick={() => clearError()}>
              Close
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleCheckout}>
              Retry Payment
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
