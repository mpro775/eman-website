import { useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiImage, FiPlus, FiX } from 'react-icons/fi';
import { uploadImage, validateImageFile, type UploadOptions } from '../../../services/upload.service';
import { handleApiError } from '../../../utils/errorHandler';
import { resolveImageUrl } from '../../../utils/imageUrl';

interface MultiImageUploadProps {
  label?: string;
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  maxSize?: number;
  allowedTypes?: string[];
  /** Upper bound on stored images; must stay <= the DTO's ArrayMaxSize(30). */
  max?: number;
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

/**
 * Ordered gallery uploader.
 *
 * Not N copies of `ImageUpload`: that component seeds its preview from `value`
 * only at mount and never re-syncs, so removing an item from the middle would
 * leave every later row showing its predecessor's image. Batch selection also
 * belongs here, since the API takes one file per request.
 */
export const MultiImageUpload = ({
  label,
  value,
  onChange,
  folder,
  maxSize = 10 * 1024 * 1024,
  allowedTypes,
  max = 30,
  helperText,
  error,
  disabled = false,
}: MultiImageUploadProps) => {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isUploading = progress !== null;

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    if (inputRef.current) inputRef.current.value = '';
    if (picked.length === 0) return;

    setUploadError(null);

    const room = Math.max(0, max - value.length);
    const problems: string[] = [];

    if (picked.length > room) problems.push(`الحد الأقصى ${max} صورة`);

    const validationOptions = { maxSize, ...(allowedTypes && { allowedTypes }) };
    const accepted = picked.slice(0, room).filter((file) => {
      const check = validateImageFile(file, validationOptions);
      if (!check.valid) problems.push(`${file.name}: ${check.error}`);
      return check.valid;
    });

    if (accepted.length === 0) {
      setUploadError(problems.join(' · ') || 'تعذّر رفع الصور');
      return;
    }

    // Sequential, not Promise.all: each upload triggers a 2048px re-encode on
    // the server, and one failure should not take the rest of the batch down.
    const uploaded: string[] = [];
    setProgress({ done: 0, total: accepted.length });

    for (let i = 0; i < accepted.length; i++) {
      const file = accepted[i];
      try {
        const options: UploadOptions = {
          maxSize,
          ...(allowedTypes && { allowedTypes }),
          ...(folder && { folder }),
        };
        const result = await uploadImage(file, options);

        // upload.service falls back to a base64 data URL when the endpoint is
        // unreachable. Storing several of those would bloat the document, so
        // treat it as a failure instead.
        if (result.url.startsWith('data:')) {
          problems.push(`${file.name}: تعذّر رفع الصورة إلى الخادم`);
        } else {
          uploaded.push(result.url);
        }
      } catch (err) {
        problems.push(`${file.name}: ${handleApiError(err)}`);
      }
      setProgress({ done: i + 1, total: accepted.length });
    }

    setProgress(null);
    // One update at the end — `value` is frozen at call time inside the loop.
    if (uploaded.length > 0) onChange([...value, ...uploaded]);
    if (problems.length > 0) setUploadError(problems.join(' · '));
  };

  const removeAt = (index: number) => {
    const next = [...value];
    next.splice(index, 1);
    onChange(next);
  };

  const moveBy = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const displayError = error || uploadError;
  const canAdd = !disabled && !isUploading && value.length < max;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-[color:var(--color-admin-text-primary)]">
          {label}
          <span className="text-[color:var(--color-admin-text-muted)] mr-2">
            ({value.length}/{max})
          </span>
        </label>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {value.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative aspect-square rounded-lg overflow-hidden border border-[color:var(--color-admin-border)] bg-[color:var(--color-admin-bg-secondary)] group"
          >
            <img src={resolveImageUrl(url)} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />

            <button
              type="button"
              onClick={() => removeAt(index)}
              disabled={disabled || isUploading}
              aria-label={`حذف الصورة ${index + 1}`}
              className="absolute top-1 left-1 w-7 h-7 flex items-center justify-center bg-[color:var(--color-admin-danger)] text-white rounded-full transition-all duration-150 hover:bg-[#DC2626] disabled:opacity-50"
            >
              <FiX />
            </button>

            {/* Order matters for the public gallery, so expose explicit moves. */}
            <div className="absolute bottom-1 inset-x-1 flex justify-between opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
              <button
                type="button"
                onClick={() => moveBy(index, -1)}
                disabled={index === 0 || disabled || isUploading}
                aria-label="تحريك لليمين"
                className="w-6 h-6 flex items-center justify-center bg-black/60 text-white rounded disabled:opacity-30"
              >
                <FiChevronRight className="text-sm" />
              </button>
              <span className="px-1.5 rounded bg-black/60 text-white text-[10px] leading-6 tabular-nums">
                {index + 1}
              </span>
              <button
                type="button"
                onClick={() => moveBy(index, 1)}
                disabled={index === value.length - 1 || disabled || isUploading}
                aria-label="تحريك لليسار"
                className="w-6 h-6 flex items-center justify-center bg-black/60 text-white rounded disabled:opacity-30"
              >
                <FiChevronLeft className="text-sm" />
              </button>
            </div>
          </div>
        ))}

        {canAdd && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square flex flex-col items-center justify-center gap-1 border-2 border-dashed border-[color:var(--color-admin-border)] bg-[color:var(--color-admin-bg-secondary)] rounded-lg text-[color:var(--color-admin-text-muted)] transition-all duration-300 hover:border-[color:var(--color-admin-border-light)] hover:bg-[color:var(--color-admin-bg-card)]"
          >
            <FiPlus className="text-2xl" />
            <span className="text-xs">إضافة صور</span>
          </button>
        )}

        {isUploading && (
          <div className="aspect-square flex flex-col items-center justify-center gap-2 border border-[color:var(--color-admin-border)] bg-[color:var(--color-admin-bg-secondary)] rounded-lg">
            <div className="w-8 h-8 border-2 border-[color:var(--color-admin-border)] border-t-[color:var(--color-admin-accent-blue)] rounded-full animate-spin" />
            <span className="text-xs text-[color:var(--color-admin-text-secondary)]">
              جاري رفع {progress.done} من {progress.total}
            </span>
          </div>
        )}
      </div>

      {value.length === 0 && !isUploading && (
        <div className="flex items-center gap-2 text-[color:var(--color-admin-text-muted)] text-sm">
          <FiImage />
          <span>لا توجد صور في المعرض</span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {displayError && <span className="text-xs text-[color:var(--color-admin-danger)]">{displayError}</span>}
      {helperText && !displayError && (
        <span className="text-xs text-[color:var(--color-admin-text-muted)]">{helperText}</span>
      )}
    </div>
  );
};
