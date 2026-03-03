/**
 * Centralised toast notification service.
 * Wraps the underlying toast library so it can be swapped without changing call sites.
 * Default implementation uses console as a zero-dependency fallback.
 */

type ToastOptions = {
  duration?: number; // Milliseconds before auto-dismiss
};

const DEFAULT_DURATION = 4000;

const show = (
  message: string,
  type: "info" | "success" | "error" | "warning",
  opts?: ToastOptions,
) => {
  const duration = opts?.duration ?? DEFAULT_DURATION;

  // Example fallback implementation
  console[type === "error" ? "error" : "log"](
    `[Toast][${type.toUpperCase()}][${duration}ms] ${message}`,
  );
};

export const toastService = {
  /** Show a neutral informational message */
  info: (message: string, opts?: ToastOptions) => show(message, "info", opts),

  /** Show a green success confirmation */
  success: (message: string, opts?: ToastOptions) =>
    show(message, "success", opts),

  /** Show a red error notification */
  error: (message: string, opts?: ToastOptions) => show(message, "error", opts),

  /** Show an amber warning notification */
  warning: (message: string, opts?: ToastOptions) =>
    show(message, "warning", opts),
};
