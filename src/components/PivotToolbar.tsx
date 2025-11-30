import type { PivotConfig, PivotField } from '../lib/types';
import { buildPivot } from '../lib/pivotEngine';

export interface PivotToolbarProps<T = Record<string, unknown>> {
  data: T[];
  fields: PivotField[];
  config: PivotConfig;
  onConfigChange: (config: PivotConfig) => void;
  onExport?: () => void;
  className?: string;
}

export function PivotToolbar<T = Record<string, unknown>>({
  data,
  fields,
  config,
  onConfigChange,
  onExport,
  className = '',
}: PivotToolbarProps<T>) {
  const handleReset = () => {
    const resetConfig: PivotConfig = {
      rows: [],
      columns: [],
      values: [],
      filters: [],
    };
    onConfigChange(resetConfig);
  };

  const handleExportCSV = () => {
    const pivotResult = buildPivot(data as Record<string, unknown>[], fields, config);
    const { rowHeaders, columnHeaders, cells } = pivotResult;

    // Build CSV
    const csvRows: string[] = [];

    // Header row(s)
    const rowFieldLabels = config.rows.map(id => fields.find(f => f.id === id)?.label || id);
    
    // Column headers
    if (columnHeaders.length > 0) {
      columnHeaders.forEach((headerRow) => {
        const row = [...rowFieldLabels.map(() => ''), ...headerRow];
        csvRows.push(row.join(','));
      });
    }

    // Data rows
    rowHeaders.forEach((rowHeader, rowIndex) => {
      const row = [...rowHeader];
      cells[rowIndex]?.forEach(cell => {
        row.push(cell.value !== null ? String(cell.value) : '');
      });
      csvRows.push(row.join(','));
    });

    // Create download
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pivot-export.csv';
    a.click();
    URL.revokeObjectURL(url);

    if (onExport) {
      onExport();
    }
  };

  return (
    <div className={`pivot-toolbar ${className}`}>
      <button 
        className="pivot-toolbar-btn"
        onClick={handleReset}
      >
        Reset Layout
      </button>
      <button 
        className="pivot-toolbar-btn"
        onClick={handleExportCSV}
      >
        Export to CSV
      </button>
    </div>
  );
}
