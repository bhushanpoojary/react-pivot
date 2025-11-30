import type { PivotResultCell } from '../lib/types';

interface PivotValueCellProps {
  cell: PivotResultCell;
  className?: string;
}

export function PivotValueCell({ cell, className = '' }: PivotValueCellProps) {
  const formattedValue = cell.value !== null 
    ? typeof cell.value === 'number' 
      ? cell.value.toFixed(2)
      : String(cell.value)
    : '-';

  return (
    <td className={`pivot-value-cell ${className}`}>
      {formattedValue}
    </td>
  );
}
