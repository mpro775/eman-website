import { type SelectHTMLAttributes, forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Option[];
  placeholder?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-[color:var(--color-admin-text-primary)]">
            {label}
            {props.required && <span className="text-[color:var(--color-admin-danger)] mr-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-3 bg-[color:var(--color-admin-bg-secondary)] border ${
            error
              ? 'border-[color:var(--color-admin-danger)]'
              : 'border-[color:var(--color-admin-border)]'
          } rounded-lg text-[color:var(--color-admin-text-primary)] text-sm transition-all duration-300 focus:outline-none focus:border-[color:var(--color-admin-border-focus)] focus:shadow-[0_0_0_3px_rgba(74,158,255,0.1)] disabled:opacity-50 cursor-pointer ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-xs text-[color:var(--color-admin-danger)]">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-xs text-[color:var(--color-admin-text-muted)]">{helperText}</span>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

