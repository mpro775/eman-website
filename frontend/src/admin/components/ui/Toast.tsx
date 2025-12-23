import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeClasses = {
    success: 'border-r-4 border-[color:var(--color-admin-success)]',
    error: 'border-r-4 border-[color:var(--color-admin-danger)]',
    warning: 'border-r-4 border-[color:var(--color-admin-warning)]',
    info: 'border-r-4 border-[color:var(--color-admin-info)]',
  };

  const toastContent = (
    <div
      className={`fixed top-5 left-5 right-5 z-[2000] max-w-md mx-auto bg-[color:var(--color-admin-bg-card)] border border-[color:var(--color-admin-border)] rounded-lg shadow-[0_10px_15px_rgba(0,0,0,0.5)] p-4 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
      } ${typeClasses[type]}`}
    >
      <div className="flex justify-between items-center gap-3">
        <span className="text-[color:var(--color-admin-text-primary)] text-sm flex-1">
          {message}
        </span>
        <button
          className="bg-transparent border-0 text-[color:var(--color-admin-text-secondary)] text-xl leading-none cursor-pointer p-0 w-5 h-5 flex items-center justify-center rounded hover:bg-[color:var(--color-admin-bg-secondary)] hover:text-[color:var(--color-admin-text-primary)] transition-all duration-150"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );

  return createPortal(toastContent, document.body);
};
