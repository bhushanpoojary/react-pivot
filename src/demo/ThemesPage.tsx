import { useState } from 'react';
import { PivotTable } from '../components/PivotTable';
import { ThemeSelector } from '../components/ThemeSelector';
import { themes, setStoredTheme } from '../lib/themes';
import type { PivotField, PivotConfig } from '../lib/types';

const sampleData = [
  { region: 'North', product: 'Laptop', quantity: 15, revenue: 22500 },
  { region: 'North', product: 'Mouse', quantity: 50, revenue: 1500 },
  { region: 'South', product: 'Laptop', quantity: 10, revenue: 15000 },
  { region: 'South', product: 'Keyboard', quantity: 30, revenue: 3000 },
];

const fields: PivotField[] = [
  { id: 'region', label: 'Region', dataKey: 'region', type: 'row' },
  { id: 'product', label: 'Product', dataKey: 'product', type: 'row' },
  { id: 'quantity', label: 'Quantity', dataKey: 'quantity', type: 'value', aggregation: 'sum' },
  { id: 'revenue', label: 'Revenue', dataKey: 'revenue', type: 'value', aggregation: 'sum' },
];

const config: PivotConfig = {
  rows: ['region'],
  columns: ['product'],
  values: ['revenue'],
  filters: [],
};

export function ThemesPage() {
  const [currentTheme, setCurrentTheme] = useState<string>('quartz');

  const handleThemeSelect = (themeId: string) => {
    setCurrentTheme(themeId);
    setStoredTheme(themeId);
  };

  return (
    <div className="demo-app">
      <header className="demo-header">
        <h1>React Pivot Themes</h1>
        <p>Choose from multiple beautiful themes for your pivot tables</p>
        <div style={{ marginTop: '20px' }}>
          <ThemeSelector />
        </div>
      </header>

      <main className="demo-main">
        <section className="demo-section">
          <h2>Available Themes</h2>
          <p>Click on any theme card to preview it instantly</p>
          
          <div className="theme-demo-grid">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`theme-demo-card ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeSelect(theme.id)}
              >
                <div className="theme-demo-name">{theme.name}</div>
                <div className="theme-demo-description">{theme.description}</div>
                <div className="theme-demo-preview">
                  <div
                    className="theme-color-swatch"
                    style={{
                      background: getThemeColor(theme.id, 'primary'),
                    }}
                    title="Primary"
                  />
                  <div
                    className="theme-color-swatch"
                    style={{
                      background: getThemeColor(theme.id, 'accent'),
                    }}
                    title="Accent"
                  />
                  <div
                    className="theme-color-swatch"
                    style={{
                      background: getThemeColor(theme.id, 'text'),
                    }}
                    title="Text"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section">
          <h2>Live Preview</h2>
          <p>This pivot table updates instantly when you change themes</p>
          <PivotTable
            data={sampleData}
            fields={fields}
            config={config}
          />
        </section>

        <section className="demo-section">
          <h2>Using Themes</h2>
          <div className="demo-info">
            <h3>Quick Start</h3>
            <p>Themes are applied using CSS variables and data attributes:</p>
            <pre style={{
              background: 'var(--pivot-bg-secondary)',
              padding: '16px',
              borderRadius: '4px',
              overflow: 'auto',
            }}>
{`import { ThemeSelector } from 'react-pivot';

function App() {
  return (
    <div>
      <ThemeSelector />
      <PivotTable {...props} />
    </div>
  );
}`}
            </pre>

            <h3 style={{ marginTop: '24px' }}>Manual Theme Application</h3>
            <pre style={{
              background: 'var(--pivot-bg-secondary)',
              padding: '16px',
              borderRadius: '4px',
              overflow: 'auto',
            }}>
{`// Apply theme
document.documentElement.setAttribute('data-theme', 'dark');

// Remove theme (back to default)
document.documentElement.removeAttribute('data-theme');`}
            </pre>

            <h3 style={{ marginTop: '24px' }}>Custom Theme</h3>
            <p>Create your own theme by defining CSS variables:</p>
            <pre style={{
              background: 'var(--pivot-bg-secondary)',
              padding: '16px',
              borderRadius: '4px',
              overflow: 'auto',
            }}>
{`[data-theme="custom"] {
  --pivot-bg-primary: #yourcolor;
  --pivot-bg-secondary: #yourcolor;
  --pivot-text-primary: #yourcolor;
  --pivot-accent-primary: #yourcolor;
  /* ... more variables */
}`}
            </pre>
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

function getThemeColor(themeId: string, type: 'primary' | 'accent' | 'text'): string {
  const colorMap: Record<string, Record<string, string>> = {
    quartz: { primary: '#ffffff', accent: '#2196f3', text: '#213547' },
    alpine: { primary: '#ffffff', accent: '#3498db', text: '#2c3e50' },
    material: { primary: '#fafafa', accent: '#1976d2', text: '#212121' },
    dark: { primary: '#1e1e1e', accent: '#42a5f5', text: '#e0e0e0' },
    nord: { primary: '#eceff4', accent: '#5e81ac', text: '#2e3440' },
    dracula: { primary: '#282a36', accent: '#bd93f9', text: '#f8f8f2' },
    'solarized-light': { primary: '#fdf6e3', accent: '#268bd2', text: '#657b83' },
    'solarized-dark': { primary: '#002b36', accent: '#268bd2', text: '#839496' },
    monokai: { primary: '#272822', accent: '#66d9ef', text: '#f8f8f2' },
    'one-dark': { primary: '#282c34', accent: '#61afef', text: '#abb2bf' },
  };

  return colorMap[themeId]?.[type] || '#000000';
}
