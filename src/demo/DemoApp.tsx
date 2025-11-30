import { useState } from 'react';
import { PivotTable } from '../components/PivotTable';
import { PivotFieldList } from '../components/PivotFieldList';
import { PivotToolbar } from '../components/PivotToolbar';
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
      </header>

      <main className="demo-main">
        <section className="demo-section">
          <h2>Configure Pivot Table</h2>
          <p>Drag and drop fields to different zones to configure your pivot table</p>
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
          <h2>About</h2>
          <div className="demo-info">
            <p>
              <strong>react-pivot</strong> is an open-source React library for building
              interactive pivot tables with drag-and-drop field configuration.
            </p>
            <h3>Features:</h3>
            <ul>
              <li>✨ Drag-and-drop field configuration</li>
              <li>📊 Multiple aggregation types (sum, avg, min, max, count)</li>
              <li>🎨 Minimal, customizable styling</li>
              <li>📦 Lightweight with no heavy dependencies</li>
              <li>🔧 TypeScript support</li>
              <li>💾 CSV export functionality</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="demo-footer">
        <p>
          Built with React + TypeScript + Vite | 
          <a href="https://github.com/bhushanpoojary/react-pivot" target="_blank" rel="noopener noreferrer">
            {' '}GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
