/**
 * Razorpay Script Loader Utility
 * 
 * This utility handles dynamic loading of the Razorpay checkout script.
 * It ensures the script is loaded only once and provides a promise-based interface.
 */

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
let scriptLoadPromise: Promise<void> | null = null;

/**
 * Load Razorpay script dynamically
 * @returns Promise that resolves when script is loaded
 * @throws Error if script fails to load
 */
export const loadRazorpayScript = (): Promise<void> => {
  // Return cached promise if already loading/loaded
  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve();
      return;
    }

    // Check if script tag already exists in DOM
    const existingScript = document.querySelector(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`
    );
    
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => {
        scriptLoadPromise = null;
        reject(new Error('Failed to load Razorpay script'));
      });
      return;
    }

    // Create and append script tag
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadPromise = null;
      reject(new Error('Failed to load Razorpay script'));
    };

    document.head.appendChild(script);
  });

  return scriptLoadPromise;
};

/**
 * Type definition for Razorpay window object
 */
declare global {
  interface Window {
    Razorpay: any;
  }
}
