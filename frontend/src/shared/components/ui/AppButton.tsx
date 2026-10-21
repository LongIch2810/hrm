import React from 'react';
import { Loader2 } from 'lucide-react';

export interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    let baseStyles =
      'inline-flex items-center justify-center font-medium rounded-full transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

    // Size variants
    let sizeStyles = 'h-10 px-5 text-sm gap-2';
    if (size === 'sm') {
      sizeStyles = 'h-8 px-3.5 text-xs gap-1.5';
    } else if (size === 'lg') {
      sizeStyles = 'h-12 px-6 text-base gap-2.5';
    }

    // Color variants
    let variantStyles = 'bg-primary text-white hover:bg-black focus-visible:ring-stone-800';
    if (variant === 'outline') {
      variantStyles =
        'bg-transparent text-ink border border-hairline-strong hover:bg-surface-strong focus-visible:ring-stone-400';
    } else if (variant === 'ghost') {
      variantStyles = 'bg-transparent text-body hover:text-ink hover:bg-surface-strong focus-visible:ring-stone-300';
    } else if (variant === 'danger') {
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600';
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

AppButton.displayName = 'AppButton';
