import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface TagsInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  /** Upper bound; must stay <= the DTO's ArrayMaxSize(20). */
  maxTags?: number;
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

/** Chip editor for a free-form list of short labels. */
export const TagsInput = ({
  label,
  value,
  onChange,
  placeholder = 'اكتب ثم اضغط Enter',
  maxTags = 20,
  helperText,
  error,
  disabled = false,
}: TagsInputProps) => {
  const [draft, setDraft] = useState('');

  const commit = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (value.length >= maxTags) return;
    // Case-insensitive dedupe, but keep the casing the admin typed.
    if (value.some((existing) => existing.toLowerCase() === tag.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange([...value, tag]);
    setDraft('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      // Without this, Enter submits the surrounding form mid-edit.
      e.preventDefault();
      commit(draft);
      return;
    }
    if (e.key === 'Backspace' && draft === '' && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeAt = (index: number) => {
    const next = [...value];
    next.splice(index, 1);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-[color:var(--color-admin-text-primary)]">
          {label}
          <span className="text-[color:var(--color-admin-text-muted)] mr-2">
            ({value.length}/{maxTags})
          </span>
        </label>
      )}

      <div
        className={`w-full flex flex-wrap items-center gap-2 px-3 py-2.5 bg-[color:var(--color-admin-bg-secondary)] border ${
          error ? 'border-[color:var(--color-admin-danger)]' : 'border-[color:var(--color-admin-border)]'
        } rounded-lg transition-all duration-300 focus-within:border-[color:var(--color-admin-border-focus)] focus-within:shadow-[0_0_0_3px_rgba(74,158,255,0.1)]`}
      >
        {value.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[color:var(--color-admin-bg-tertiary)] border border-[color:var(--color-admin-border)] text-sm text-[color:var(--color-admin-text-primary)]"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeAt(index)}
              disabled={disabled}
              aria-label={`حذف ${tag}`}
              className="text-[color:var(--color-admin-text-muted)] hover:text-[color:var(--color-admin-danger)] transition-colors duration-150 disabled:opacity-50"
            >
              <FiX className="text-sm" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => commit(draft)}
          placeholder={value.length >= maxTags ? '' : placeholder}
          disabled={disabled || value.length >= maxTags}
          className="flex-1 min-w-[140px] bg-transparent border-0 outline-none text-[color:var(--color-admin-text-primary)] text-sm placeholder:text-[color:var(--color-admin-text-muted)] disabled:opacity-50"
        />
      </div>

      {error && <span className="text-xs text-[color:var(--color-admin-danger)]">{error}</span>}
      {helperText && !error && (
        <span className="text-xs text-[color:var(--color-admin-text-muted)]">{helperText}</span>
      )}
    </div>
  );
};
