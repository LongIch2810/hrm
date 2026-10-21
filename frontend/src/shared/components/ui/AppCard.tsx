import React from 'react';

export interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'orb-mint' | 'orb-sky' | 'orb-peach';
  bordered?: boolean;
}

export const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
  ({ variant = 'default', bordered = true, className = '', children, ...props }, ref) => {
    let bgStyles = 'bg-surface-card';
    if (variant === 'orb-mint') {
      bgStyles = 'bg-orb-mint-peach';
    } else if (variant === 'orb-sky') {
      bgStyles = 'bg-orb-sky-lavender';
    } else if (variant === 'orb-peach') {
      bgStyles = 'bg-orb-peach-rose';
    } else if (variant === 'flat') {
      bgStyles = 'bg-canvas-soft';
    }

    const borderStyle = bordered ? 'border border-hairline' : '';

    return (
      <div
        ref={ref}
        className={`rounded-2xl ${bgStyles} ${borderStyle} p-6 shadow-subtle transition-shadow duration-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AppCard.displayName = 'AppCard';
