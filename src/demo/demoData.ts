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

export interface InventoryData {
  warehouse: string;
  product: string;
  status: string;
  stockLevel: number;
  reorderPoint: number;
  valueUSD: number;
}

export const inventoryData: InventoryData[] = [
  { warehouse: 'Warehouse A', product: 'Laptop', status: 'In Stock', stockLevel: 120, reorderPoint: 50, valueUSD: 180000 },
  { warehouse: 'Warehouse A', product: 'Mouse', status: 'In Stock', stockLevel: 350, reorderPoint: 100, valueUSD: 10500 },
  { warehouse: 'Warehouse A', product: 'Keyboard', status: 'Low Stock', stockLevel: 45, reorderPoint: 50, valueUSD: 4500 },
  { warehouse: 'Warehouse B', product: 'Laptop', status: 'In Stock', stockLevel: 85, reorderPoint: 50, valueUSD: 127500 },
  { warehouse: 'Warehouse B', product: 'Monitor', status: 'In Stock', stockLevel: 200, reorderPoint: 75, valueUSD: 60000 },
  { warehouse: 'Warehouse B', product: 'Mouse', status: 'In Stock', stockLevel: 400, reorderPoint: 100, valueUSD: 12000 },
  { warehouse: 'Warehouse C', product: 'Keyboard', status: 'In Stock', stockLevel: 180, reorderPoint: 50, valueUSD: 18000 },
  { warehouse: 'Warehouse C', product: 'Monitor', status: 'Low Stock', stockLevel: 60, reorderPoint: 75, valueUSD: 18000 },
  { warehouse: 'Warehouse C', product: 'Laptop', status: 'In Stock', stockLevel: 95, reorderPoint: 50, valueUSD: 142500 },
  { warehouse: 'Warehouse A', product: 'Monitor', status: 'In Stock', stockLevel: 150, reorderPoint: 75, valueUSD: 45000 },
  { warehouse: 'Warehouse B', product: 'Keyboard', status: 'In Stock', stockLevel: 220, reorderPoint: 50, valueUSD: 22000 },
  { warehouse: 'Warehouse C', product: 'Mouse', status: 'In Stock', stockLevel: 500, reorderPoint: 100, valueUSD: 15000 },
];

export interface OrderData {
  orderDate: string;
  customer: string;
  orderStatus: string;
  orderValue: number;
  itemCount: number;
  shippingCost: number;
}

export const orderData: OrderData[] = [
  { orderDate: '2024-01', customer: 'Acme Corp', orderStatus: 'Delivered', orderValue: 15000, itemCount: 25, shippingCost: 150 },
  { orderDate: '2024-01', customer: 'TechStart Inc', orderStatus: 'Delivered', orderValue: 8500, itemCount: 12, shippingCost: 85 },
  { orderDate: '2024-01', customer: 'Global Systems', orderStatus: 'Delivered', orderValue: 22000, itemCount: 18, shippingCost: 220 },
  { orderDate: '2024-02', customer: 'Acme Corp', orderStatus: 'Delivered', orderValue: 18000, itemCount: 30, shippingCost: 180 },
  { orderDate: '2024-02', customer: 'DataFlow Ltd', orderStatus: 'Shipped', orderValue: 12000, itemCount: 15, shippingCost: 120 },
  { orderDate: '2024-02', customer: 'TechStart Inc', orderStatus: 'Delivered', orderValue: 9500, itemCount: 14, shippingCost: 95 },
  { orderDate: '2024-03', customer: 'Global Systems', orderStatus: 'Processing', orderValue: 25000, itemCount: 22, shippingCost: 250 },
  { orderDate: '2024-03', customer: 'Acme Corp', orderStatus: 'Shipped', orderValue: 16500, itemCount: 28, shippingCost: 165 },
  { orderDate: '2024-03', customer: 'DataFlow Ltd', orderStatus: 'Delivered', orderValue: 14000, itemCount: 18, shippingCost: 140 },
  { orderDate: '2024-01', customer: 'DataFlow Ltd', orderStatus: 'Delivered', orderValue: 11000, itemCount: 16, shippingCost: 110 },
  { orderDate: '2024-02', customer: 'Global Systems', orderStatus: 'Delivered', orderValue: 19500, itemCount: 20, shippingCost: 195 },
  { orderDate: '2024-03', customer: 'TechStart Inc', orderStatus: 'Processing', orderValue: 10500, itemCount: 13, shippingCost: 105 },
];
