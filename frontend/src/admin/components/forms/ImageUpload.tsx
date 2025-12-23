import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const ImageUpload = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // TODO: Upload to server and get URL
    // For now, we'll use the data URL
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      onChange(reader.result as string);
      setIsUploading(false);
    }, 1000);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-[color:var(--color-admin-text-primary)]">
          {label}
          {required && <span className="text-[color:var(--color-admin-danger)] mr-1">*</span>}
        </label>
      )}
      <div className="flex flex-col gap-3">
        {preview ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[color:var(--color-admin-border)]">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-[color:var(--color-admin-danger)] text-white rounded-full hover:bg-[#DC2626] transition-all duration-150"
            >
              <FiX />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
              error
                ? 'border-[color:var(--color-admin-danger)] bg-[rgba(239,68,68,0.05)]'
                : 'border-[color:var(--color-admin-border)] bg-[color:var(--color-admin-bg-secondary)] hover:border-[color:var(--color-admin-border-light)] hover:bg-[color:var(--color-admin-bg-card)]'
            }`}
          >
            <FiImage className="text-4xl text-[color:var(--color-admin-text-muted)]" />
            <div className="text-center">
              <p className="text-sm text-[color:var(--color-admin-text-secondary)] m-0">
                اضغط لرفع صورة
              </p>
              <p className="text-xs text-[color:var(--color-admin-text-muted)] m-0 mt-1">
                PNG, JPG, GIF حتى 10MB
              </p>
            </div>
            {isUploading && (
              <div className="w-6 h-6 border-2 border-[color:var(--color-admin-border)] border-t-[color:var(--color-admin-accent-blue)] rounded-full animate-spin" />
            )}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        {!preview && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[color:var(--color-admin-bg-card)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] text-sm transition-all duration-150 hover:bg-[color:var(--color-admin-bg-card-hover)] hover:border-[color:var(--color-admin-border-light)] disabled:opacity-50"
            disabled={isUploading}
          >
            <FiUpload />
            {isUploading ? 'جاري الرفع...' : 'اختر صورة'}
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs text-[color:var(--color-admin-danger)]">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-xs text-[color:var(--color-admin-text-muted)]">{helperText}</span>
      )}
    </div>
  );
};

