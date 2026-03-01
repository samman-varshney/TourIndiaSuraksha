import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;       // Visually hidden accessible label
  fullPage?: boolean;   // Centre in full viewport
}

/** Animated spinner with optional full-page overlay mode */
const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  label = 'Loading…',
  fullPage = false,
}) => {
  const spinner = (
    <div className={`loader loader--${size}`} role="status" aria-label={label}>
      <span className="loader-spinner" />
      <span className="sr-only">{label}</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="loader-overlay">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;
