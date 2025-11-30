import type { AggregationType } from './types';

export const AGGREGATORS: Record<AggregationType, (values: number[]) => number> = {
  sum: (values: number[]) => values.reduce((acc, val) => acc + val, 0),
  
  avg: (values: number[]) => {
    if (values.length === 0) return 0;
    return values.reduce((acc, val) => acc + val, 0) / values.length;
  },
  
  min: (values: number[]) => {
    if (values.length === 0) return 0;
    return Math.min(...values);
  },
  
  max: (values: number[]) => {
    if (values.length === 0) return 0;
    return Math.max(...values);
  },
  
  count: (values: number[]) => values.length,
};

export function aggregate(values: number[], type: AggregationType): number {
  const aggregator = AGGREGATORS[type];
  return aggregator(values);
}
