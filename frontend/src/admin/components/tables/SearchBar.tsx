import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'بحث...',
  className = '',
}: SearchBarProps) => {
  return (
    <div className={`relative ${className}`}>
      <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-admin-text-muted)]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-10 pl-4 py-3 bg-[color:var(--color-admin-bg-secondary)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] text-sm transition-all duration-300 focus:outline-none focus:border-[color:var(--color-admin-border-focus)] focus:shadow-[0_0_0_3px_rgba(74,158,255,0.1)] placeholder:text-[color:var(--color-admin-text-muted)]"
      />
    </div>
  );
};

