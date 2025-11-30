import { useState } from 'react';
import { PivotTable } from '../components/PivotTable';
import { PivotFieldList } from '../components/PivotFieldList';
import { PivotToolbar } from '../components/PivotToolbar';
import { ThemeSelector } from '../components/ThemeSelector';
import type { PivotField, PivotConfig } from '../lib/types';
import { salesData } from './demoData';

export function DemoApp() {
  const fields: PivotField[] = [
    { id: 'date', label: 'Date', dataKey: 'date', type: 'row' },
    { id: 'region', label: 'Region', dataKey: 'region', type: 'row' },
    { id: 'product', label: 'Product', dataKey: 'product', type: 'row' },
    { id: 'category', label: 'Category', dataKey: 'category', type: 'row' },
    { id: 'quantity', label: 'Quantity', dataKey: 'quantity', type: 'value', aggregation: 'sum' },
    { id: 'revenue', label: 'Revenue', dataKey: 'revenue', type: 'value', aggregation: 'sum' },
    { id: 'cost', label: 'Cost', dataKey: 'cost', type: 'value', aggregation: 'sum' },
    { id: 'avgRevenue', label: 'Avg Revenue', dataKey: 'revenue', type: 'value', aggregation: 'avg' },
  ];

  const [config, setConfig] = useState<PivotConfig>({
    rows: ['region'],
    columns: ['date'],
    values: ['revenue'],
    filters: [],
  });

  return (
    <div className="demo-app">
      <header className="demo-header">
        <h1>React Pivot Table Demo</h1>
        <p>A lightweight, customizable pivot table component for React</p>
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
            <span style={{ marginRight: '6px' }}>⭐</span>
            View on GitHub
          </a>
        </div>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
          <code className="npm-install-pill">
            npm install react-pivot
          </code>
          <span style={{ marginLeft: '8px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
            (coming soon)
          </span>
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-section">
          <h2>Configure Pivot Table</h2>
          <p className="section-help-text">
            Drag fields between Rows, Columns and Values to change the pivot layout
          </p>
          <div className="data-info-chips">
            <span className="info-chip">
              📊 Records: {salesData.length.toLocaleString()}
            </span>
            <span className="info-chip">
              🔢 Aggregations: sum, avg, min, max, count
            </span>
          </div>
          <PivotFieldList
            fields={fields}
            config={config}
            onConfigChange={setConfig}
          />
        </section>

        <section className="demo-section">
          <div className="demo-toolbar-section">
            <h2>Pivot Table</h2>
            <PivotToolbar
              data={salesData}
              fields={fields}
              config={config}
              onConfigChange={setConfig}
            />
          </div>
          <PivotTable
            data={salesData}
            fields={fields}
            config={config}
            onConfigChange={setConfig}
            showTotals
          />
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
      </main>

      <footer className="demo-footer">
        <div className="footer-content">
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
