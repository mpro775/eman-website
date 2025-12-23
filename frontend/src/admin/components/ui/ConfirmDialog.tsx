import { Modal } from './Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) => {
  const variantClasses = {
    danger: 'bg-[color:var(--color-admin-danger)] hover:bg-[#DC2626]',
    warning: 'bg-[color:var(--color-admin-warning)] hover:bg-[#D97706]',
    info: 'bg-[color:var(--color-admin-info)] hover:bg-[#3A8EFF]',
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" title={title}>
      <div className="flex flex-col gap-6">
        <p className="text-[color:var(--color-admin-text-secondary)] text-sm leading-relaxed m-0">
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            className="bg-[color:var(--color-admin-bg-card)] text-[color:var(--color-admin-text-primary)] border border-[color:var(--color-admin-border)] rounded-lg px-4 py-2.5 font-medium text-sm transition-all duration-150 hover:bg-[color:var(--color-admin-bg-card-hover)] hover:border-[color:var(--color-admin-border-light)] disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            className={`${variantClasses[variant]} text-white rounded-lg px-4 py-2.5 font-medium text-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]`}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'جاري...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
