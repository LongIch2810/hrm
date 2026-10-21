import React from 'react';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface AppTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  mobileCardRender?: (item: T) => React.ReactNode;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

export function AppTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'Không có dữ liệu hiển thị.',
  mobileCardRender,
  currentPage = 1,
  totalPages = 1,
  totalItems,
  onPageChange,
  isLoading = false,
}: AppTableProps<T>) {
  return (
    <div className="w-full bg-surface-card rounded-2xl border border-hairline overflow-hidden shadow-subtle">
      {/* Desktop / Tablet Table View (hidden on mobile if mobileCardRender is provided) */}
      <div className={`overflow-x-auto ${mobileCardRender ? 'hidden md:block' : 'block'}`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-canvas-soft border-b border-hairline h-11">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-2.5 text-xs font-semibold text-muted tracking-wider uppercase ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline-soft">
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: 5 }).map((_, rIdx) => (
                <tr key={rIdx} className="h-14 animate-pulse">
                  {columns.map((_, cIdx) => (
                    <td key={cIdx} className="px-4 py-3">
                      <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-muted">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Inbox className="w-8 h-8 text-muted-soft" />
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  className="h-14 hover:bg-canvas-soft/60 transition-colors"
                >
                  {columns.map((col, cIdx) => (
                    <td
                      key={cIdx}
                      className={`px-4 py-3 text-sm text-body ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      } ${col.className || ''}`}
                    >
                      {col.cell
                        ? col.cell(item)
                        : col.accessorKey
                        ? (item[col.accessorKey] as React.ReactNode)
                        : null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (only on small screens if mobileCardRender is provided) */}
      {mobileCardRender && (
        <div className="md:hidden divide-y divide-hairline">
          {isLoading ? (
            <div className="p-4 space-y-3">
              <div className="h-20 bg-stone-200 rounded-xl animate-pulse" />
              <div className="h-20 bg-stone-200 rounded-xl animate-pulse" />
            </div>
          ) : data.length === 0 ? (
            <div className="p-8 text-center text-muted flex flex-col items-center justify-center gap-2">
              <Inbox className="w-8 h-8 text-muted-soft" />
              <p className="text-sm">{emptyMessage}</p>
            </div>
          ) : (
            data.map((item) => (
              <div key={keyExtractor(item)} className="p-4 hover:bg-canvas-soft/40 transition-colors">
                {mobileCardRender(item)}
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination Footer */}
      {(totalPages > 1 || (totalItems !== undefined && totalItems > 0)) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-hairline bg-canvas-soft/40 text-xs text-muted">
          <div>
            {totalItems !== undefined ? (
              <span>
                Hiển thị <span className="font-medium text-ink">{data.length}</span> trên{' '}
                <span className="font-medium text-ink">{totalItems}</span> bản ghi
              </span>
            ) : (
              <span>
                Trang <span className="font-medium text-ink">{currentPage}</span> / {totalPages}
              </span>
            )}
          </div>

          {totalPages > 1 && onPageChange && (
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="p-1.5 rounded-full hover:bg-surface-strong disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-ink"
                aria-label="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-surface-card rounded-full border border-hairline font-medium text-ink">
                {currentPage}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="p-1.5 rounded-full hover:bg-surface-strong disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-ink"
                aria-label="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
