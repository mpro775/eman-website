import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage, FiCheck } from 'react-icons/fi';
import { uploadImage, validateImageFile, type UploadOptions } from '../../../services/upload.service';
import { handleApiError } from '../../../utils/errorHandler';

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  folder?: string;
  showProgress?: boolean;
}

export const ImageUpload = ({
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  allowedTypes,
  folder,
  showProgress = true,
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setUploadError(null);
    setUploadSuccess(false);
    setUploadProgress(0);

    // Validate file
    const validationOptions = { maxSize, ...(allowedTypes && { allowedTypes }) };
    const validation = validateImageFile(file, validationOptions);
    if (!validation.valid) {
      setUploadError(validation.error || 'خطأ في التحقق من الملف');
      return;
    }

    // Create preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setIsUploading(true);
    try {
      const uploadOptions: UploadOptions = {
        maxSize,
        ...(allowedTypes && { allowedTypes }),
        ...(folder && { folder }),
      };

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await uploadImage(file, uploadOptions);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadSuccess(true);

      // Update preview with uploaded URL if different
      if (result.url !== preview) {
        setPreview(result.url);
      }

      // Call onChange with the URL
      onChange(result.url);

      // Reset success state after 2 seconds
      setTimeout(() => {
        setUploadSuccess(false);
        setIsUploading(false);
      }, 2000);
    } catch (err) {
      setUploadError(handleApiError(err));
      setIsUploading(false);
      setUploadProgress(0);
      // Keep preview for user to retry
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    setUploadError(null);
    setUploadSuccess(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayError = error || uploadError;

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
            {isUploading && showProgress && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-[color:var(--color-admin-border)] border-t-[color:var(--color-admin-accent-blue)] rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-sm text-white">
                    {uploadProgress}%
                  </p>
                </div>
              </div>
            )}
            {uploadSuccess && (
              <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-[color:var(--color-admin-success)] text-white rounded-full">
                <FiCheck />
              </div>
            )}
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-[color:var(--color-admin-danger)] text-white rounded-full hover:bg-[#DC2626] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
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
      {displayError && (
        <span className="text-xs text-[color:var(--color-admin-danger)]">{displayError}</span>
      )}
      {helperText && !displayError && (
        <span className="text-xs text-[color:var(--color-admin-text-muted)]">{helperText}</span>
      )}
    </div>
  );
};

