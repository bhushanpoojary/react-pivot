# React Pivot

[![CI](https://github.com/bhushanpoojary/react-pivot/actions/workflows/ci.yml/badge.svg)](https://github.com/bhushanpoojary/react-pivot/actions/workflows/ci.yml)
[![Deploy](https://github.com/bhushanpoojary/react-pivot/actions/workflows/deploy.yml/badge.svg)](https://github.com/bhushanpoojary/react-pivot/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, customizable React pivot table component library with drag-and-drop field configuration.

[**Live Demo**](https://bhushanpoojary.github.io/react-pivot/) | [**View Themes**](https://bhushanpoojary.github.io/react-pivot/themes.html)

## ✨ Demo

> **📹 GIF Demo Coming Soon!** - Record a 5-10 second GIF to showcase the features below

![React Pivot Demo](./demo.gif)

<details>
<summary><b>🎬 How to Record the Demo GIF</b></summary>

### Recording Tools:
- **Windows**: [ScreenToGif](https://www.screentogif.com/) (Free, recommended)
- **Mac**: [Kap](https://getkap.co/) (Free, open-source)
- **Cross-platform**: [Gifski](https://gif.ski/) or [LICEcap](https://www.cockos.com/licecap/)

### What to Show (5-10 seconds):
1. ✨ **Drag a field** from Available → Rows or Columns (2 seconds)
2. 🎨 **Switch theme** using the dropdown (1 second)
3. 📊 **Switch dataset tab** (Sales → Inventory → Orders) (2 seconds)
4. ✓ **Toggle "Show Grand Totals"** (1 second)
5. 📋 **Click "Copy CSV"** button (1 second)

### Recording Tips:
- Keep it under 10 seconds
- Use 800x600 resolution or smaller
- Focus on the main table area
- No audio needed
- 10-15 FPS is enough
- Compress to under 5MB

### After Recording:
1. Save as `demo.gif` in repository root
2. Commit: `git add demo.gif && git commit -m "Add demo GIF" && git push`
3. The README will automatically show it!

</details>

## Features

✨ **Drag-and-Drop Configuration** - Intuitive field arrangement with HTML5 drag-and-drop  
📊 **Multiple Aggregations** - Sum, Average, Min, Max, Count  
🎨 **10 Beautiful Themes** - Pre-built themes with CSS variables for customization  
📦 **Lightweight** - No heavy dependencies, tree-shakeable  
🔧 **TypeScript Support** - Full type definitions included  
💾 **CSV Export** - Built-in export functionality  
⚡ **Fast** - Pure TypeScript pivot engine with React rendering layer

## Installation

```bash
npm install react-pivot
```

or

```bash
yarn add react-pivot
```

## Quick Start

```tsx
import { PivotTable, PivotFieldList, PivotToolbar } from 'react-pivot';
import { useState } from 'react';

function App() {
  const data = [
    { date: '2024-01', region: 'North', product: 'Laptop', revenue: 22500 },
    { date: '2024-01', region: 'South', product: 'Mouse', revenue: 1500 },
    // ... more data
  ];

  const fields = [
    { id: 'date', label: 'Date', dataKey: 'date', type: 'row' },
    { id: 'region', label: 'Region', dataKey: 'region', type: 'row' },
    { id: 'product', label: 'Product', dataKey: 'product', type: 'row' },
    { id: 'revenue', label: 'Revenue', dataKey: 'revenue', type: 'value', aggregation: 'sum' },
  ];

  const [config, setConfig] = useState({
    rows: ['region'],
    columns: ['date'],
    values: ['revenue'],
    filters: [],
  });

  return (
    <div>
      <PivotFieldList
        fields={fields}
        config={config}
        onConfigChange={setConfig}
      />
      <PivotToolbar
        data={data}
        fields={fields}
        config={config}
        onConfigChange={setConfig}
      />
      <PivotTable
        data={data}
        fields={fields}
        config={config}
        onConfigChange={setConfig}
      />
    </div>
  );
}
```

## Usage

### Core Components

#### `PivotTable`

The main pivot table renderer.

```tsx
<PivotTable
  data={data}              // Array of data objects
  fields={fields}          // Field definitions
  config={config}          // Pivot configuration
  onConfigChange={setConfig}  // Config change handler
  showTotals={true}        // Optional: show totals
  className="my-pivot"     // Optional: custom class
/>
```

#### `PivotFieldList`

Drag-and-drop field configuration panel.

```tsx
<PivotFieldList
  fields={fields}
  config={config}
  onConfigChange={setConfig}
/>
```

#### `PivotToolbar`

Toolbar with reset and export functionality.

```tsx
<PivotToolbar
  data={data}
  fields={fields}
  config={config}
  onConfigChange={setConfig}
/>
```

### Field Definition

```typescript
interface PivotField {
  id: string;              // Unique field identifier
  label: string;           // Display label
  dataKey: string;         // Property name in data
  type: 'row' | 'column' | 'value' | 'filter';
  aggregation?: 'sum' | 'avg' | 'min' | 'max' | 'count';
  formatter?: (value: any) => string;  // Custom formatter
}
```

### Configuration

```typescript
interface PivotConfig {
  rows: string[];          // Field IDs for row dimensions
  columns: string[];       // Field IDs for column dimensions
  values: string[];        // Field IDs for value measures
  filters?: PivotFilter[]; // Optional filters
}
```

## Advanced Usage

### Custom Aggregation

```typescript
import { buildPivot, AGGREGATORS } from 'react-pivot';

// Use the core engine directly
const result = buildPivot(data, fields, config);

// Access aggregators
const sum = AGGREGATORS.sum([1, 2, 3, 4]); // 10
```

### Themes

Choose from 10 pre-built themes or create your own:

```tsx
import { ThemeSelector } from 'react-pivot';

function App() {
  return (
    <div>
      <ThemeSelector />
      <PivotTable {...props} />
    </div>
  );
}
```

**Available Themes:**
- Quartz (Modern White) - Default
- Alpine (Classic Business)
- Material Design
- Dark Mode
- Nord (Arctic)
- Dracula
- Solarized Light/Dark
- Monokai
- One Dark

**Custom Theme:**

```css
[data-theme="custom"] {
  --pivot-bg-primary: #yourcolor;
  --pivot-accent-primary: #yourcolor;
  /* ... more variables */
}
```

## Development

```bash
# Clone the repository
git clone https://github.com/bhushanpoojary/react-pivot.git
cd react-pivot

# Install dependencies
npm install

# Run demo app
npm run dev

# Build library
npm run build:lib

# Build demo for deployment
npm run build
```

## Architecture

```
src/
├── lib/                 # Core pivot engine (framework-agnostic)
│   ├── types.ts         # TypeScript definitions
│   ├── aggregation.ts   # Aggregation functions
│   └── pivotEngine.ts   # Pure pivot logic
├── components/          # React UI components
│   ├── PivotTable.tsx
│   ├── PivotFieldList.tsx
│   ├── PivotToolbar.tsx
│   └── ...
└── demo/                # Example application
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Related Projects

- [React Data Grid](https://reactdatagrid.dev) - Enterprise-grade data grid for React

## License

MIT © [Bhushan Poojary](https://github.com/bhushanpoojary)

**react-pivot** is currently in active development. Feedback and GitHub issues are welcome!

## Acknowledgments

Built with:
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/bhushanpoojary">Bhushan Poojary</a>
</p>
