import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { _id?: string; id?: string }>({
  columns,
  data,
  loading = false,
  emptyMessage = 'لا توجد بيانات',
  onRowClick,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-[color:var(--color-admin-text-secondary)]">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-3 border-[rgba(74,158,255,0.3)] rounded-full" />
          <div className="absolute inset-0 border-3 border-transparent border-t-[#4a9eff] rounded-full animate-spin" />
        </div>
        <p className="text-sm m-0 font-medium">جاري التحميل...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[rgba(74,158,255,0.1)] to-[rgba(157,78,221,0.1)] mb-3">
          <span className="text-3xl">📭</span>
        </div>
        <p className="text-sm m-0 text-[color:var(--color-admin-text-secondary)] font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-[rgba(74,158,255,0.08)] to-[rgba(157,78,221,0.08)]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="p-4 text-right font-semibold text-[color:var(--color-admin-text-primary)] border-b-2 border-[rgba(90,90,136,0.3)] text-sm"
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <span className="text-xs opacity-50">↕</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const itemId = item._id || item.id || index.toString();
              return (
                <tr
                  key={itemId}
                  onClick={() => onRowClick?.(item)}
                  className={`transition-all duration-300 border-b border-[rgba(77,77,119,0.2)] last:border-b-0 group
                    hover:bg-gradient-to-r hover:from-[rgba(74,158,255,0.05)] hover:to-[rgba(157,78,221,0.05)]
                    ${onRowClick ? 'cursor-pointer' : ''}
                  `}
                  style={{
                    animation: `slideUp ${0.1 + index * 0.03}s ease-out`
                  }}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="p-4 text-[color:var(--color-admin-text-secondary)] text-sm transition-all duration-300 group-hover:text-[color:var(--color-admin-text-primary)]"
                    >
                      {column.render ? column.render(item) : (item as any)[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
