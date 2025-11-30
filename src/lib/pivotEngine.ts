import type { PivotField, PivotConfig, PivotResult, PivotResultCell } from './types';
import { aggregate } from './aggregation';

export function buildPivot(
  data: Record<string, unknown>[],
  fields: PivotField[],
  config: PivotConfig
): PivotResult {
  // Apply filters
  let filteredData = data;
  if (config.filters && config.filters.length > 0) {
    filteredData = data.filter(row => {
      return config.filters!.every(filter => {
        const field = fields.find(f => f.id === filter.fieldId);
        if (!field) return true;
        return filter.predicate(row[field.dataKey]);
      });
    });
  }

  // Get field definitions
  const rowFields = config.rows.map(id => fields.find(f => f.id === id)!).filter(Boolean);
  const colFields = config.columns.map(id => fields.find(f => f.id === id)!).filter(Boolean);
  const valueFields = config.values.map(id => fields.find(f => f.id === id)!).filter(Boolean);

  // Build unique row and column keys
  const rowKeysSet = new Set<string>();
  const colKeysSet = new Set<string>();

  filteredData.forEach(row => {
    const rowKey = rowFields.map(f => String(row[f.dataKey] ?? '')).join('|');
    const colKey = colFields.length > 0 
      ? colFields.map(f => String(row[f.dataKey] ?? '')).join('|')
      : 'total';
    
    rowKeysSet.add(rowKey);
    colKeysSet.add(colKey);
  });

  const rowKeys = Array.from(rowKeysSet).sort();
  const colKeys = Array.from(colKeysSet).sort();

  // Build row headers (matrix)
  const rowHeaders: string[][] = rowKeys.map(key => key.split('|'));

  // Build column headers (matrix)
  const columnHeaders: string[][] = [];
  
  if (colFields.length > 0) {
    // For each column level
    for (let level = 0; level < colFields.length; level++) {
      const headerRow: string[] = [];
      colKeys.forEach(colKey => {
        const parts = colKey.split('|');
        headerRow.push(parts[level] || '');
      });
      columnHeaders.push(headerRow);
    }
  } else {
    // No column fields, just show value field names
    columnHeaders.push(valueFields.map(vf => vf.label));
  }

  // Build cells matrix
  const cells: PivotResultCell[][] = [];

  rowKeys.forEach((rowKey) => {
    const rowCells: PivotResultCell[] = [];

    colKeys.forEach(colKey => {
      valueFields.forEach(valueField => {
        // Find matching data rows
        const matchingRows = filteredData.filter(dataRow => {
          const dataRowKey = rowFields.map(f => String(dataRow[f.dataKey] ?? '')).join('|');
          const dataColKey = colFields.length > 0
            ? colFields.map(f => String(dataRow[f.dataKey] ?? '')).join('|')
            : 'total';
          
          return dataRowKey === rowKey && dataColKey === colKey;
        });

        // Extract values and aggregate
        const values = matchingRows
          .map(r => parseFloat(String(r[valueField.dataKey])))
          .filter(v => !isNaN(v));

        const aggregatedValue = valueField.aggregation
          ? aggregate(values, valueField.aggregation)
          : null;

        rowCells.push({
          rowKey,
          columnKey: colKey,
          value: aggregatedValue,
          fieldId: valueField.id,
          aggregation: valueField.aggregation || 'sum',
        });
      });
    });

    cells.push(rowCells);
  });

  return {
    rowHeaders,
    columnHeaders,
    cells,
  };
}
