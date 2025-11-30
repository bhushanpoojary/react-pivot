interface PivotHeaderCellProps {
  value: string;
  onClick?: () => void;
  className?: string;
}

export function PivotHeaderCell({ value, onClick, className = '' }: PivotHeaderCellProps) {
  return (
    <th 
      className={`pivot-header-cell ${className} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      {value}
    </th>
  );
}
