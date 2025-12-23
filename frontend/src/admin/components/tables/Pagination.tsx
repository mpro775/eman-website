import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
      {totalItems !== undefined && itemsPerPage !== undefined && (
        <div className="text-sm text-[color:var(--color-admin-text-secondary)]">
          عرض {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} من {totalItems}
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          className="w-10 h-10 flex items-center justify-center bg-[color:var(--color-admin-bg-card)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] transition-all duration-150 hover:bg-[color:var(--color-admin-bg-card-hover)] hover:border-[color:var(--color-admin-border-light)] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <FiChevronRight />
        </button>
        {startPage > 1 && (
          <>
            <button
              className="w-10 h-10 flex items-center justify-center bg-[color:var(--color-admin-bg-card)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] transition-all duration-150 hover:bg-[color:var(--color-admin-bg-card-hover)] hover:border-[color:var(--color-admin-border-light)]"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="text-[color:var(--color-admin-text-muted)]">...</span>
            )}
          </>
        )}
        {pages.map((page) => (
          <button
            key={page}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-150 ${
              page === currentPage
                ? 'bg-[color:var(--color-admin-accent-blue)] text-white'
                : 'bg-[color:var(--color-admin-bg-card)] border border-[color:var(--color-admin-border)] text-[color:var(--color-admin-text-primary)] hover:bg-[color:var(--color-admin-bg-card-hover)] hover:border-[color:var(--color-admin-border-light)]'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="text-[color:var(--color-admin-text-muted)]">...</span>
            )}
            <button
              className="w-10 h-10 flex items-center justify-center bg-[color:var(--color-admin-bg-card)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] transition-all duration-150 hover:bg-[color:var(--color-admin-bg-card-hover)] hover:border-[color:var(--color-admin-border-light)]"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          className="w-10 h-10 flex items-center justify-center bg-[color:var(--color-admin-bg-card)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] transition-all duration-150 hover:bg-[color:var(--color-admin-bg-card-hover)] hover:border-[color:var(--color-admin-border-light)] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <FiChevronLeft />
        </button>
      </div>
    </div>
  );
};
