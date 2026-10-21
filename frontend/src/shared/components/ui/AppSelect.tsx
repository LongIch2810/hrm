import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface OptionItem {
  value: string;
  label: string;
}

export interface AppSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: OptionItem[];
  helperText?: string;
  errorMessage?: string;
}

export const AppSelect = React.forwardRef<HTMLSelectElement, AppSelectProps>(
  ({ label, options, helperText, errorMessage, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const hasError = Boolean(errorMessage);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-body-strong">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          <select
            id={selectId}
            ref={ref}
            className={`w-full h-11 pl-3.5 pr-10 bg-surface-card text-ink text-sm rounded-lg border appearance-none transition-all duration-150 focus:outline-none cursor-pointer ${
              hasError
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-hairline-strong focus:ring-2 focus:ring-stone-200 focus:border-ink'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown className="w-4 h-4 text-muted absolute right-3.5 pointer-events-none" />
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

AppSelect.displayName = 'AppSelect';
