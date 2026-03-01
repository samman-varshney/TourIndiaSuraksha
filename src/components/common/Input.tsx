import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: React.ReactNode;
}

/** Labelled input field with error, hint, and optional left addon support */
const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftAddon,
  id,
  className = '',
  ...rest
}) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={`input-field-wrap ${leftAddon ? 'input-field-wrap--addon' : ''}`}>
        {leftAddon && <span className="input-addon">{leftAddon}</span>}
        <input
          id={inputId}
          className={[
            'input-field',
            error ? 'input-field--error' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          aria-invalid={!!error}
          {...rest}
        />
      </div>
      {error && (
        <span id={`${inputId}-error`} className="input-error" role="alert">
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={`${inputId}-hint`} className="input-hint">
          {hint}
        </span>
      )}
    </div>
  );
};

export default Input;
