import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of the provided value.
 * Useful for delaying search/filter API calls until the user pauses typing.
 */
export const useDebounce = <T>(value: T, delay: number = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    // Cancel the timer if value changes before delay expires
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
