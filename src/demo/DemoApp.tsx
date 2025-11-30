import { useState } from 'react';
import { PivotTable } from '../components/PivotTable';
import { PivotFieldList } from '../components/PivotFieldList';
import { PivotToolbar } from '../components/PivotToolbar';
import { ThemeSelector } from '../components/ThemeSelector';
import { CodeHighlight } from '../components/CodeHighlight';
import type { PivotConfig } from '../lib/types';
import { salesData, inventoryData, orderData } from './demoData';

type DatasetType = 'sales' | 'inventory' | 'orders';

const datasets = {
  sales: {
    name: 'Sales Data',
    data: salesData,
    fields: [
      { id: 'date', label: 'Date', dataKey: 'date', type: 'row' as const },
      { id: 'region', label: 'Region', dataKey: 'region', type: 'row' as const },
      { id: 'product', label: 'Product', dataKey: 'product', type: 'row' as const },
      { id: 'category', label: 'Category', dataKey: 'category', type: 'row' as const },
      { id: 'quantity', label: 'Quantity', dataKey: 'quantity', type: 'value' as const, aggregation: 'sum' as const },
      { id: 'revenue', label: 'Revenue', dataKey: 'revenue', type: 'value' as const, aggregation: 'sum' as const },
      { id: 'cost', label: 'Cost', dataKey: 'cost', type: 'value' as const, aggregation: 'sum' as const },
      { id: 'avgRevenue', label: 'Avg Revenue', dataKey: 'revenue', type: 'value' as const, aggregation: 'avg' as const },
    ],
    defaultConfig: {
      rows: ['region'],
      columns: ['date'],
      values: ['revenue'],
      filters: [],
    }
  },
  inventory: {
    name: 'Inventory Data',
    data: inventoryData,
    fields: [
      { id: 'warehouse', label: 'Warehouse', dataKey: 'warehouse', type: 'row' as const },
      { id: 'product', label: 'Product', dataKey: 'product', type: 'row' as const },
      { id: 'status', label: 'Status', dataKey: 'status', type: 'row' as const },
      { id: 'stockLevel', label: 'Stock Level', dataKey: 'stockLevel', type: 'value' as const, aggregation: 'sum' as const },
      { id: 'reorderPoint', label: 'Reorder Point', dataKey: 'reorderPoint', type: 'value' as const, aggregation: 'avg' as const },
      { id: 'valueUSD', label: 'Value (USD)', dataKey: 'valueUSD', type: 'value' as const, aggregation: 'sum' as const },
    ],
    defaultConfig: {
      rows: ['warehouse'],
      columns: ['product'],
      values: ['stockLevel'],
      filters: [],
    }
  },
  orders: {
    name: 'Orders Data',
    data: orderData,
    fields: [
      { id: 'orderDate', label: 'Order Date', dataKey: 'orderDate', type: 'row' as const },
      { id: 'customer', label: 'Customer', dataKey: 'customer', type: 'row' as const },
      { id: 'orderStatus', label: 'Status', dataKey: 'orderStatus', type: 'row' as const },
      { id: 'orderValue', label: 'Order Value', dataKey: 'orderValue', type: 'value' as const, aggregation: 'sum' as const },
      { id: 'itemCount', label: 'Item Count', dataKey: 'itemCount', type: 'value' as const, aggregation: 'sum' as const },
      { id: 'shippingCost', label: 'Shipping Cost', dataKey: 'shippingCost', type: 'value' as const, aggregation: 'sum' as const },
    ],
    defaultConfig: {
      rows: ['customer'],
      columns: ['orderDate'],
      values: ['orderValue'],
      filters: [],
    }
  }
};

export function DemoApp() {
  const [activeDataset, setActiveDataset] = useState<DatasetType>('sales');
  const [config, setConfig] = useState<PivotConfig>(datasets.sales.defaultConfig);
  const [showTotals, setShowTotals] = useState(true);
  const [copiedNpm, setCopiedNpm] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'typescript' | 'javascript'>('typescript');
  const [copiedCode, setCopiedCode] = useState(false);

  const currentDataset = datasets[activeDataset];

  const handleDatasetChange = (dataset: DatasetType) => {
    setActiveDataset(dataset);
    setConfig(datasets[dataset].defaultConfig);
  };

  const copyNpmCommand = () => {
    navigator.clipboard.writeText('npm install react-pivot');
    setCopiedNpm(true);
    setTimeout(() => setCopiedNpm(false), 2000);
  };

  const copyCodeExample = () => {
    const code = activeCodeTab === 'typescript' ? typescriptExample : javascriptExample;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const typescriptExample = `import { useState } from 'react';
import { PivotTable, PivotFieldList } from 'react-pivot';
import type { PivotConfig, PivotField } from 'react-pivot';

function MyPivotApp() {
  const [config, setConfig] = useState<PivotConfig>({
    rows: ['region'],
    columns: ['date'],
    values: ['revenue'],
    filters: []
  });

  const fields: PivotField[] = [
    { id: 'date', label: 'Date', dataKey: 'date', type: 'row' },
    { id: 'region', label: 'Region', dataKey: 'region', type: 'row' },
    { id: 'product', label: 'Product', dataKey: 'product', type: 'row' },
    { id: 'revenue', label: 'Revenue', dataKey: 'revenue', type: 'value', aggregation: 'sum' }
  ];

  const data = [
    { date: '2024-01', region: 'North', product: 'Widget', revenue: 1500 },
    { date: '2024-01', region: 'South', product: 'Gadget', revenue: 2300 },
    { date: '2024-02', region: 'North', product: 'Widget', revenue: 1800 },
    // ... more data
  ];

  return (
    <div>
      <PivotFieldList 
        fields={fields} 
        config={config} 
        onConfigChange={setConfig} 
      />
      <PivotTable 
        data={data} 
        fields={fields} 
        config={config} 
        showTotals={true}
      />
    </div>
  );
}

export default MyPivotApp;`;

  const javascriptExample = `import { useState } from 'react';
import { PivotTable, PivotFieldList } from 'react-pivot';

function MyPivotApp() {
  const [config, setConfig] = useState({
    rows: ['region'],
    columns: ['date'],
    values: ['revenue'],
    filters: []
  });

  const fields = [
    { id: 'date', label: 'Date', dataKey: 'date', type: 'row' },
    { id: 'region', label: 'Region', dataKey: 'region', type: 'row' },
    { id: 'product', label: 'Product', dataKey: 'product', type: 'row' },
    { id: 'revenue', label: 'Revenue', dataKey: 'revenue', type: 'value', aggregation: 'sum' }
  ];

  const data = [
    { date: '2024-01', region: 'North', product: 'Widget', revenue: 1500 },
    { date: '2024-01', region: 'South', product: 'Gadget', revenue: 2300 },
    { date: '2024-02', region: 'North', product: 'Widget', revenue: 1800 },
    // ... more data
  ];

  return (
    <div>
      <PivotFieldList 
        fields={fields} 
        config={config} 
        onConfigChange={setConfig} 
      />
      <PivotTable 
        data={data} 
        fields={fields} 
        config={config} 
        showTotals={true}
      />
    </div>
  );
}

export default MyPivotApp;`;

  return (
    <div className="demo-app">
      <a
        href="https://github.com/bhushanpoojary/react-pivot/tree/main/src/demo"
        target="_blank"
        rel="noopener noreferrer"
        className="edit-demo-link"
        aria-label="Edit demo source code on GitHub"
      >
        🔧 Edit Demo on GitHub
      </a>
      
      <header className="demo-header">
        <div className="header-badge-container">
          <a
            href="https://github.com/bhushanpoojary/react-pivot"
            target="_blank"
            rel="noopener noreferrer"
            className="github-star-badge"
            title="Star react-pivot on GitHub"
            aria-label="Star react-pivot on GitHub"
          >
            ⭐ Star on GitHub
          </a>
        </div>
        <h1>React Pivot Table Demo</h1>
        <p>A lightweight, customizable pivot table component for React with drag-and-drop fields and data aggregations</p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <ThemeSelector />
          <a
            href="themes.html"
            className="hero-button"
          >
            🎨 View All Themes
          </a>
          <a
            href="https://github.com/bhushanpoojary/react-pivot"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button"
          >
            View on GitHub
          </a>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <code className="npm-install-pill">
            npm install react-pivot
          </code>
          <button
            onClick={copyNpmCommand}
            className="copy-button"
            title="Copy npm command"
          >
            {copiedNpm ? '✓' : '📋'}
          </button>
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-section">
          <div className="dataset-tabs">
            {(Object.keys(datasets) as DatasetType[]).map((key) => (
              <button
                key={key}
                className={`dataset-tab ${activeDataset === key ? 'active' : ''}`}
                onClick={() => handleDatasetChange(key)}
              >
                {datasets[key].name}
              </button>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Configure Pivot Table</h2>
          <p className="section-help-text">
            Drag fields between Rows, Columns and Values to change the pivot layout
          </p>
          <div className="data-info-chips">
            <span className="info-chip">
              📊 Records: {currentDataset.data.length.toLocaleString()}
            </span>
            <span className="info-chip">
              🔢 Aggregations: sum, avg, min, max, count
            </span>
          </div>
          <PivotFieldList
            fields={currentDataset.fields}
            config={config}
            onConfigChange={setConfig}
          />
        </section>

        <section className="demo-section">
          <div className="demo-toolbar-section">
            <h2>Pivot Table</h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <label className="totals-toggle">
                <input
                  type="checkbox"
                  checked={showTotals}
                  onChange={(e) => setShowTotals(e.target.checked)}
                />
                <span>Show Grand Totals</span>
              </label>
              <PivotToolbar
                data={currentDataset.data as unknown as Record<string, unknown>[]}
                fields={currentDataset.fields}
                config={config}
                onConfigChange={setConfig}
              />
            </div>
          </div>
          <PivotTable
            data={currentDataset.data as unknown as Record<string, unknown>[]}
            fields={currentDataset.fields}
            config={config}
            onConfigChange={setConfig}
            showTotals={showTotals}
          />
        </section>

        <section className="demo-section" style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0 }}>Code Example</h2>
            <button
              onClick={copyCodeExample}
              className="copy-button"
              title="Copy code"
              style={{ padding: '8px 16px' }}
            >
              {copiedCode ? '✓ Copied!' : '📋 Copy Code'}
            </button>
          </div>
          <div className="code-tabs">
            <button
              className={`code-tab ${activeCodeTab === 'typescript' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('typescript')}
            >
              TypeScript
            </button>
            <button
              className={`code-tab ${activeCodeTab === 'javascript' ? 'active' : ''}`}
              onClick={() => setActiveCodeTab('javascript')}
            >
              JavaScript
            </button>
          </div>
          <div className="code-example">
            <CodeHighlight 
              code={activeCodeTab === 'typescript' ? typescriptExample : javascriptExample}
              language={activeCodeTab}
            />
          </div>
        </section>

        <section className="demo-section">
          <h2>Why react-pivot?</h2>
          <div className="demo-info">
            <p>
              <strong>react-pivot</strong> is an open-source React library for building
              interactive pivot tables with drag-and-drop field configuration.
            </p>
            <h3>Features:</h3>
            <ul>
              <li>✅ Drag-and-drop field configuration (rows, columns, values, filters)</li>
              <li>✅ Multiple aggregation types (sum, avg, min, max, count)</li>
              <li>✅ Works with large datasets</li>
              <li>✅ Headless engine + React UI components</li>
              <li>✅ 10+ beautiful themes with customizable styling</li>
              <li>✅ TypeScript support with full type safety</li>
              <li>✅ CSV export functionality</li>
              <li>✅ Lightweight with no heavy dependencies</li>
            </ul>
            <p style={{ marginTop: '20px', fontStyle: 'italic', color: 'var(--pivot-text-secondary)' }}>
              react-pivot is currently in active development. Feedback and GitHub issues are welcome!
            </p>
          </div>
        </section>

        <section className="demo-section" style={{ marginTop: '40px' }}>
          <article>
            <h2>What is a Pivot Table in React?</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
              A pivot table is a powerful data summarization tool used in business intelligence dashboards, 
              analytics applications, CRM systems, and financial reporting. React pivot tables enable developers 
              to create interactive data analysis interfaces where users can dynamically reorganize and aggregate 
              large datasets to discover insights.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
              <strong>react-pivot</strong> brings enterprise-grade pivot table capabilities to React applications 
              with features like drag-and-drop field configuration, multiple aggregation functions (sum, average, 
              min, max, count), row and column grouping, and CSV data export. Whether you're building a sales 
              analytics dashboard, inventory management system, or financial reporting tool, react-pivot provides 
              the flexibility and performance you need.
            </p>
            
            <h3>How to Use react-pivot</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
              Getting started with react-pivot is simple. Install the package via npm, import the components, 
              and configure your data fields. The library provides both a headless pivot engine for advanced 
              use cases and ready-to-use React UI components for quick integration. Check out the interactive 
              demo above to see react-pivot in action with real datasets.
            </p>
            
            <h3>Perfect for Data Analytics and BI Applications</h3>
            <p style={{ lineHeight: '1.6' }}>
              Whether you need a React data grid with pivot capabilities, an aggregation table for your analytics 
              dashboard, or a drag-and-drop pivot interface for business intelligence, react-pivot delivers a 
              lightweight, TypeScript-first solution with beautiful themes and extensive customization options.
            </p>
          </article>
        </section>
      </main>

      <footer className="demo-footer">
        <div className="footer-content">
          <div className="footer-cta">
            <a href="https://reactdatagrid.dev" target="_blank" rel="noopener noreferrer" className="footer-cta-link">
              ← Back to React DataGrid
            </a>
          </div>
          <p className="footer-main">
            Made by <a href="https://github.com/bhushanpoojary" target="_blank" rel="noopener noreferrer">Bhushan Poojary</a>
          </p>
          <div className="footer-links">
            <a href="https://github.com/bhushanpoojary/react-pivot" target="_blank" rel="noopener noreferrer">
              React Pivot (GitHub)
            </a>
            <span className="footer-separator">•</span>
            <a href="https://reactdatagrid.dev" target="_blank" rel="noopener noreferrer">
              React Data Grid
            </a>
          </div>
          <p className="footer-tech">
            Built with React + TypeScript + Vite
          </p>
        </div>
      </footer>
    </div>
  );
}
