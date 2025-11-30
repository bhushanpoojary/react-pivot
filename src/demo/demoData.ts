export interface SalesData {
  date: string;
  region: string;
  product: string;
  category: string;
  quantity: number;
  revenue: number;
  cost: number;
}

export const salesData: SalesData[] = [
  { date: '2024-01', region: 'North', product: 'Laptop', category: 'Electronics', quantity: 15, revenue: 22500, cost: 15000 },
  { date: '2024-01', region: 'North', product: 'Mouse', category: 'Electronics', quantity: 50, revenue: 1500, cost: 750 },
  { date: '2024-01', region: 'South', product: 'Laptop', category: 'Electronics', quantity: 10, revenue: 15000, cost: 10000 },
  { date: '2024-01', region: 'South', product: 'Keyboard', category: 'Electronics', quantity: 30, revenue: 3000, cost: 1500 },
  { date: '2024-02', region: 'North', product: 'Laptop', category: 'Electronics', quantity: 20, revenue: 30000, cost: 20000 },
  { date: '2024-02', region: 'North', product: 'Monitor', category: 'Electronics', quantity: 25, revenue: 7500, cost: 5000 },
  { date: '2024-02', region: 'South', product: 'Mouse', category: 'Electronics', quantity: 60, revenue: 1800, cost: 900 },
  { date: '2024-02', region: 'South', product: 'Laptop', category: 'Electronics', quantity: 12, revenue: 18000, cost: 12000 },
  { date: '2024-03', region: 'North', product: 'Keyboard', category: 'Electronics', quantity: 40, revenue: 4000, cost: 2000 },
  { date: '2024-03', region: 'North', product: 'Mouse', category: 'Electronics', quantity: 55, revenue: 1650, cost: 825 },
  { date: '2024-03', region: 'South', product: 'Monitor', category: 'Electronics', quantity: 18, revenue: 5400, cost: 3600 },
  { date: '2024-03', region: 'South', product: 'Laptop', category: 'Electronics', quantity: 14, revenue: 21000, cost: 14000 },
  { date: '2024-01', region: 'East', product: 'Laptop', category: 'Electronics', quantity: 8, revenue: 12000, cost: 8000 },
  { date: '2024-01', region: 'East', product: 'Mouse', category: 'Electronics', quantity: 45, revenue: 1350, cost: 675 },
  { date: '2024-02', region: 'East', product: 'Keyboard', category: 'Electronics', quantity: 35, revenue: 3500, cost: 1750 },
  { date: '2024-02', region: 'East', product: 'Monitor', category: 'Electronics', quantity: 20, revenue: 6000, cost: 4000 },
  { date: '2024-03', region: 'East', product: 'Laptop', category: 'Electronics', quantity: 16, revenue: 24000, cost: 16000 },
  { date: '2024-03', region: 'East', product: 'Mouse', category: 'Electronics', quantity: 70, revenue: 2100, cost: 1050 },
  { date: '2024-01', region: 'West', product: 'Monitor', category: 'Electronics', quantity: 22, revenue: 6600, cost: 4400 },
  { date: '2024-01', region: 'West', product: 'Keyboard', category: 'Electronics', quantity: 28, revenue: 2800, cost: 1400 },
  { date: '2024-02', region: 'West', product: 'Laptop', category: 'Electronics', quantity: 18, revenue: 27000, cost: 18000 },
  { date: '2024-02', region: 'West', product: 'Mouse', category: 'Electronics', quantity: 65, revenue: 1950, cost: 975 },
  { date: '2024-03', region: 'West', product: 'Monitor', category: 'Electronics', quantity: 24, revenue: 7200, cost: 4800 },
  { date: '2024-03', region: 'West', product: 'Keyboard', category: 'Electronics', quantity: 32, revenue: 3200, cost: 1600 },
];
