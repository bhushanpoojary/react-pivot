# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-11-30

### Added
- **Theme System**: 10 beautiful pre-built themes
  - Quartz (Modern White) - Default
  - Alpine (Classic Business)
  - Material Design
  - Dark Mode
  - Nord (Arctic)
  - Dracula
  - Solarized Light
  - Solarized Dark
  - Monokai
  - One Dark
- `ThemeSelector` component for easy theme switching
- CSS variables for all colors and styling
- Dedicated themes showcase page at `/themes.html`
- Local storage support for theme persistence
- Theme preview with color swatches

### Changed
- All CSS colors now use CSS variables for dynamic theming
- Updated styling to support theme system
- Enhanced demo app with theme selector in header
- Multi-page build configuration (main + themes page)

### Documentation
- Added theme usage examples in themes page
- Added custom theme creation guide
- Updated README with theme information

## [0.1.0] - 2025-11-30

### Added
- Initial release of React Pivot library
- Core pivot engine with TypeScript
  - Pure TypeScript pivot logic for grouping and aggregating data
  - Five aggregation types: sum, avg, min, max, count
  - Filter support with custom predicates
- React components
  - `PivotTable`: Main table renderer with row/column headers
  - `PivotFieldList`: Drag-and-drop field configuration panel
  - `PivotToolbar`: Toolbar with reset and CSV export
  - Cell components: `PivotCell`, `PivotHeaderCell`, `PivotValueCell`
- Demo application with sample sales data
- Full TypeScript type definitions
- ESM and UMD builds
- Minimal, customizable CSS styling
- GitHub Actions CI/CD pipeline
- Comprehensive documentation and README

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-30

### Added
- Initial release of react-pivot library
- Core pivot engine with grouping and aggregation
- PivotTable component for rendering pivot tables
- PivotFieldList component with drag-and-drop field configuration
- PivotToolbar component with reset and CSV export
- Support for multiple aggregation types (sum, avg, min, max, count)
- TypeScript support with full type definitions
- Demo application with sample data
- GitHub Pages deployment
- CI/CD pipeline with GitHub Actions
- Comprehensive documentation
