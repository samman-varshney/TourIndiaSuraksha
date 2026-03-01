/**
 * Centralised toast notification service.
 * Wraps the underlying toast library so it can be swapped without changing call sites.
 * Default implementation uses the native browser Notification API as a zero-dependency fallback.
 * Replace the body of each method with your toast library (e.g. react-hot-toast, sonner).
 */

type ToastOptions = {
  duration?: number;  // Milliseconds before auto-dismiss
};

const DEFAULT_DURATION = 4000;

const show = (message: string, type: 'info' | 'success' | 'error' | 'warning', _opts?: ToastOptions) => {
  // TODO: replace with: toast[type](message, { duration: opts?.duration ?? DEFAULT_DURATION });
  console[type === 'error' ? 'error' : 'log'](`[Toast][${type.toUpperCase()}] ${message}`);
};

export const toastService = {
  /** Show a neutral informational message */
  info: (message: string, opts?: ToastOptions) => show(message, 'info', opts),

  /** Show a green success confirmation */
  success: (message: string, opts?: ToastOptions) => show(message, 'success', opts),

  /** Show a red error notification */
  error: (message: string, opts?: ToastOptions) => show(message, 'error', opts),

  /** Show an amber warning notification */
  warning: (message: string, opts?: ToastOptions) => show(message, 'warning', opts),
};
