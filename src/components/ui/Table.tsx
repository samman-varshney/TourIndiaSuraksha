import React from 'react';
import Loader from '../common/Loader';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  rowKey: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
}

/** Generic typed data table with loading and empty states */
function Table<T>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No records found.',
  rowKey,
  onRowClick,
}: TableProps<T>) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="table-loader-cell">
                <Loader size="sm" />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty-cell">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={rowKey(row, index)}
                className={onRowClick ? 'table-row--clickable' : ''}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => {
                  const value = (row as Record<string, unknown>)[col.key];
                  return (
                    <td key={col.key}>
                      {col.render ? col.render(value, row, index) : String(value ?? '')}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
