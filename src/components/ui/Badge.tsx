import React from 'react';

type BadgeVariant = 'safe' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;           // Show a coloured dot before the label
}

/** Small coloured status label used for roles, alert levels, and states */
const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  dot = false,
}) => {
  return (
    <span className={`badge badge--${variant}`}>
      {dot && <span className={`badge-dot badge-dot--${variant}`} />}
      {children}
    </span>
  );
};

export default Badge;
