import { type TextareaHTMLAttributes, forwardRef } from 'react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-[color:var(--color-admin-text-primary)]">
            {label}
            {props.required && <span className="text-[color:var(--color-admin-danger)] mr-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 bg-[color:var(--color-admin-bg-secondary)] border ${
            error
              ? 'border-[color:var(--color-admin-danger)]'
              : 'border-[color:var(--color-admin-border)]'
          } rounded-lg text-[color:var(--color-admin-text-primary)] text-sm transition-all duration-300 focus:outline-none focus:border-[color:var(--color-admin-border-focus)] focus:shadow-[0_0_0_3px_rgba(74,158,255,0.1)] placeholder:text-[color:var(--color-admin-text-muted)] disabled:opacity-50 resize-y min-h-[100px] ${className}`}
          {...props}
        />
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

FormTextarea.displayName = 'FormTextarea';

