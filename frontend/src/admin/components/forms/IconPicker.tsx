import { useMemo, useState } from 'react';
import { Modal } from '../ui/Modal';
import { DETAIL_ICON_OPTIONS, resolveDetailIcon } from '../../../utils/detailIcons';

interface IconPickerProps {
  value: string;
  onChange: (key: string) => void;
  disabled?: boolean;
  /** Modal heading. */
  title?: string;
  ariaLabel?: string;
}

/**
 * Icon chooser for a project detail row. The trigger shows the current icon and
 * opens a searchable grid.
 *
 * A modal rather than a popover: `Modal` already handles Escape, scroll locking
 * and portalling — the last of which matters twice over, since the grid would
 * otherwise be clipped by the surrounding card, and its buttons sit outside the
 * form's DOM tree where they cannot submit it.
 */
export const IconPicker = ({
  value,
  onChange,
  disabled = false,
  title = 'اختر أيقونة',
  ariaLabel = 'اختيار أيقونة',
}: IconPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const CurrentIcon = resolveDetailIcon(value);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DETAIL_ICON_OPTIONS;
    return DETAIL_ICON_OPTIONS.filter((option) =>
      `${option.key} ${option.label} ${option.keywords}`.toLowerCase().includes(q)
    );
  }, [query]);

  const select = (key: string) => {
    onChange(key);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        aria-label={ariaLabel}
        title={ariaLabel}
        className="shrink-0 w-11 h-11 flex items-center justify-center bg-[color:var(--color-admin-bg-secondary)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] transition-all duration-150 hover:border-[color:var(--color-admin-border-light)] hover:bg-[color:var(--color-admin-bg-card-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CurrentIcon className="text-xl" />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title} size="md">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن أيقونة..."
            autoFocus
            className="w-full px-4 py-3 bg-[color:var(--color-admin-bg-secondary)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] text-sm transition-all duration-300 focus:outline-none focus:border-[color:var(--color-admin-border-focus)] focus:shadow-[0_0_0_3px_rgba(74,158,255,0.1)] placeholder:text-[color:var(--color-admin-text-muted)]"
          />

          {results.length === 0 ? (
            <p className="text-center py-8 text-[color:var(--color-admin-text-muted)]">لا توجد نتائج</p>
          ) : (
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {results.map((option) => {
                const { Icon } = option;
                const isSelected = option.key === value;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => select(option.key)}
                    title={option.label}
                    aria-label={option.label}
                    aria-pressed={isSelected}
                    className={`aspect-square flex items-center justify-center rounded-lg border text-lg transition-all duration-150 ${
                      isSelected
                        ? 'border-[color:var(--color-admin-border-focus)] bg-[rgba(74,158,255,0.12)] text-[color:var(--color-admin-accent-blue)]'
                        : 'border-[color:var(--color-admin-border)] text-[color:var(--color-admin-text-secondary)] hover:bg-[color:var(--color-admin-bg-card-hover)] hover:text-[color:var(--color-admin-text-primary)]'
                    }`}
                  >
                    <Icon />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
