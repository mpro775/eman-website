import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-5"
      onClick={onClose}
    >
      <div
        className={`bg-[color:var(--color-admin-bg-card)] border border-[color:var(--color-admin-border)] rounded-xl shadow-[0_20px_25px_rgba(0,0,0,0.6)] max-h-[90vh] overflow-hidden flex flex-col w-full ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex justify-between items-center p-5 border-b border-[color:var(--color-admin-border)]">
            {title && (
              <h2 className="text-xl font-semibold text-[color:var(--color-admin-text-primary)] m-0">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                className="bg-transparent border-0 text-[color:var(--color-admin-text-secondary)] text-3xl leading-none cursor-pointer p-0 w-8 h-8 flex items-center justify-center rounded hover:bg-[color:var(--color-admin-bg-secondary)] hover:text-[color:var(--color-admin-text-primary)] transition-all duration-150"
                onClick={onClose}
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
