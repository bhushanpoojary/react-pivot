export type PivotFieldType = 'row' | 'column' | 'value' | 'filter';
export type AggregationType = 'sum' | 'avg' | 'min' | 'max' | 'count';

export interface PivotField {
  id: string;
  label: string;
  dataKey: string;
  type: PivotFieldType;
  aggregation?: AggregationType;
  formatter?: (value: unknown) => string;
}

export interface PivotFilter {
  fieldId: string;
  predicate: (value: unknown) => boolean;
}

export interface PivotConfig {
  rows: string[];
  columns: string[];
  values: string[];
  filters?: PivotFilter[];
}

export interface PivotResultCell {
  rowKey: string;
  columnKey: string;
  value: number | string | null;
  fieldId: string;
  aggregation: AggregationType;
}

export interface PivotResult {
  rowHeaders: string[][];
  columnHeaders: string[][];
  cells: PivotResultCell[][];
  rowTotals?: PivotResultCell[];
  columnTotals?: PivotResultCell[];
  grandTotal?: number;
}
