interface PivotHeaderCellProps {
  value: string;
  onClick?: () => void;
  className?: string;
  colSpan?: number;
}

export function PivotHeaderCell({ value, onClick, className = '', colSpan }: PivotHeaderCellProps) {
  return (
    <th 
      className={`pivot-header-cell ${className} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      colSpan={colSpan}
    >
      {value}
    </th>
  );
}
