import type { ReactNode } from 'react';

interface PivotCellProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function PivotCell({ children, className = '', onClick }: PivotCellProps) {
  return (
    <td 
      className={`pivot-cell ${className}`}
      onClick={onClick}
    >
      {children}
    </td>
  );
}
