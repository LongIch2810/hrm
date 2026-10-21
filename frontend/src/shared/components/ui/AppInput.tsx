import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      type = 'text',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const isPassword = type === 'password';
    const activeType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const hasError = Boolean(errorMessage);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-body-strong">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 text-muted pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={activeType}
            className={`w-full h-11 px-3.5 bg-surface-card text-ink text-sm rounded-lg border transition-all duration-150 placeholder:text-muted-soft focus:outline-none ${
              hasError
                ? 'border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-600'
                : 'border-hairline-strong focus:ring-2 focus:ring-stone-200 focus:border-ink'
            } ${leftIcon ? 'pl-10' : ''} ${isPassword || rightIcon ? 'pr-10' : ''} ${className}`}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              className="absolute right-3.5 text-muted hover:text-ink cursor-pointer p-0.5 rounded focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          ) : (
            rightIcon && (
              <div className="absolute right-3.5 text-muted pointer-events-none flex items-center">
                {rightIcon}
              </div>
            )
          )}
        </div>

        {hasError ? (
          <p className="text-xs text-red-600 font-medium mt-0.5">{errorMessage}</p>
        ) : helperText ? (
          <p className="text-xs text-muted mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

AppInput.displayName = 'AppInput';
