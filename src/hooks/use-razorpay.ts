'use client';

import { useState, useCallback } from 'react';
import { loadRazorpayScript } from '@/lib/razorpay-script';

/**
 * Razorpay Configuration Types
 */
export interface RazorpayCheckoutOptions {
  courseId: string;
  courseName: string;
  amount: number; // Amount in INR (will be converted to paise)
  userEmail: string;
  userName: string;
  description?: string;
  onSuccess?: (response: RazorpayPaymentResponse) => void;
  onError?: (error: Error) => void;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

/**
 * useRazorpay Hook
 * 
 * Manages the complete Razorpay checkout flow including:
 * - Script loading
 * - Order creation via backend
 * - Payment processing
 * - Payment verification via backend
 * 
 * @param backendApiUrl - Base URL of your backend (e.g., "http://localhost:3001")
 * @returns Object containing checkout function and loading/error states
 * 
 * @example
 * ```tsx
 * const { initiateCheckout, isLoading, error } = useRazorpay('http://localhost:3001');
 * 
 * const handleCheckout = async () => {
 *   await initiateCheckout({
 *     courseId: 'course-123',
 *     courseName: 'NLP Practitioner',
 *     amount: 35000,
 *     userEmail: 'user@example.com',
 *     userName: 'John Doe'
 *   });
 * };
 * ```
 */
export const useRazorpay = (backendApiUrl: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateCheckout = useCallback(
    async (options: RazorpayCheckoutOptions) => {
      try {
        setIsLoading(true);
        setError(null);

        // Load Razorpay script
        await loadRazorpayScript();

        // Step 1: Create order from backend
        const orderResponse = await fetch(`${backendApiUrl}/api/courses/checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId: options.courseId,
            amount: options.amount,
            currency: 'INR',
          }),
        });

        if (!orderResponse.ok) {
          throw new Error('Failed to create Razorpay order');
        }

        const orderData = await orderResponse.json();
        const { order_id, amount: orderAmount } = orderData;

        // Step 2: Initialize Razorpay checkout
        const razorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
          order_id: order_id,
          amount: orderAmount, // Amount in paise
          currency: 'INR',
          name: 'The Evolve Room',
          description: options.description || `Enrollment: ${options.courseName}`,
          image: process.env.NEXT_PUBLIC_BRAND_LOGO || '/logo.png',
          prefill: {
            name: options.userName,
            email: options.userEmail,
            contact: '',
          },
          theme: {
            color: process.env.NEXT_PUBLIC_RAZORPAY_THEME_COLOR || '#4F46E5',
          },
          handler: async (response: RazorpayPaymentResponse) => {
            try {
              // Step 3: Verify payment signature with backend
              const verifyResponse = await fetch(
                `${backendApiUrl}/api/courses/verify`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    courseId: options.courseId,
                  }),
                }
              );

              if (!verifyResponse.ok) {
                throw new Error('Payment verification failed');
              }

              const verifyData = await verifyResponse.json();

              if (verifyData.success) {
                // Payment verified successfully
                options.onSuccess?.(response);
              } else {
                throw new Error(
                  verifyData.message || 'Payment verification failed'
                );
              }
            } catch (err) {
              const error = err instanceof Error ? err : new Error('Verification error');
              setError(error.message);
              options.onError?.(error);
            } finally {
              setIsLoading(false);
            }
          },
          modal: {
            ondismiss: () => {
              setIsLoading(false);
              setError('Checkout cancelled');
            },
          },
          readonly: {
            contact: true,
            email: false,
          },
        };

        // Open Razorpay checkout
        const razorpay = new (window as any).Razorpay(razorpayOptions);
        razorpay.open();

        razorpay.on('payment.failed', (response: any) => {
          const err = new Error(
            response.error?.description || 'Payment failed'
          );
          setError(err.message);
          setIsLoading(false);
          options.onError?.(err);
        });
      } catch (err) {
        let errorMessage = 'Unknown error occurred';
        
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          errorMessage = `Cannot connect to backend at ${backendApiUrl}. Make sure the server is running on that URL.`;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        
        console.error('Checkout Error:', {
          message: errorMessage,
          backendUrl: backendApiUrl,
          originalError: err,
        });
        
        setError(errorMessage);
        setIsLoading(false);
        options.onError?.(new Error(errorMessage));
      }
    },
    [backendApiUrl]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    initiateCheckout,
    isLoading,
    error,
    clearError,
  };
};
