import { useMemo } from 'react';
import type { PivotField, PivotConfig } from '../lib/types';
import { buildPivot } from '../lib/pivotEngine';
import { PivotHeaderCell } from './PivotHeaderCell';
import { PivotValueCell } from './PivotValueCell';

export interface PivotTableProps<T = Record<string, unknown>> {
  data: T[];
  fields: PivotField[];
  config: PivotConfig;
  onConfigChange?: (config: PivotConfig) => void;
  className?: string;
  style?: React.CSSProperties;
  showTotals?: boolean;
}

export function PivotTable<T = Record<string, unknown>>({
  data,
  fields,
  config,
  className = '',
  style,
  showTotals = false,
}: PivotTableProps<T>) {
  const pivotResult = useMemo(() => {
    return buildPivot(data as Record<string, unknown>[], fields, config);
  }, [data, fields, config]);

  const { rowHeaders, columnHeaders, cells, rowTotals, columnTotals, grandTotal } = pivotResult;

  // Calculate column span for row headers
  const rowHeaderColSpan = config.rows.length;

  return (
    <div className={`pivot-table-container ${className}`} style={style}>
      <table className="pivot-table">
        <thead>
          {/* Column headers */}
          {columnHeaders.map((headerRow, rowIndex) => (
            <tr key={`col-header-${rowIndex}`}>
              {/* Empty cells for row header space */}
              {rowIndex === 0 && (
                <th 
                  colSpan={rowHeaderColSpan} 
                  rowSpan={columnHeaders.length}
                  className="pivot-corner-cell"
                >
                  {/* Empty corner */}
                </th>
              )}
              {headerRow.map((headerValue, colIndex) => (
                <PivotHeaderCell
                  key={`col-header-${rowIndex}-${colIndex}`}
                  value={headerValue}
                  className="pivot-column-header"
                />
              ))}
              {/* Total column header */}
              {showTotals && rowIndex === columnHeaders.length - 1 && (
                <PivotHeaderCell
                  value="Total"
                  className="pivot-column-header pivot-total-header"
                />
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {rowHeaders.map((rowHeader, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {/* Row headers */}
              {rowHeader.map((headerValue, colIndex) => (
                <PivotHeaderCell
                  key={`row-header-${rowIndex}-${colIndex}`}
                  value={headerValue}
                  className="pivot-row-header"
                />
              ))}
              {/* Value cells */}
              {cells[rowIndex]?.map((cell, cellIndex) => (
                <PivotValueCell
                  key={`cell-${rowIndex}-${cellIndex}`}
                  cell={cell}
                />
              ))}
              {/* Row total */}
              {showTotals && rowTotals && (
                <PivotValueCell
                  key={`row-total-${rowIndex}`}
                  cell={rowTotals[rowIndex]}
                  className="pivot-total-cell"
                />
              )}
            </tr>
          ))}
          {/* Column totals row */}
          {showTotals && columnTotals && (
            <tr className="pivot-totals-row">
              {/* "Total" label */}
              <PivotHeaderCell
                value="Total"
                className="pivot-row-header pivot-total-header"
                colSpan={rowHeaderColSpan}
              />
              {/* Column totals */}
              {columnTotals.map((cell, cellIndex) => (
                <PivotValueCell
                  key={`col-total-${cellIndex}`}
                  cell={cell}
                  className="pivot-total-cell"
                />
              ))}
              {/* Grand total */}
              {grandTotal !== null && grandTotal !== undefined && (
                <td className="pivot-cell pivot-value-cell pivot-grand-total-cell">
                  {grandTotal.toFixed(2)}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
