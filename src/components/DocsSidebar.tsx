import { useState } from 'react';

interface DocLink {
  id: string;
  label: string;
  icon?: string;
}

interface DocSection {
  title: string;
  links: DocLink[];
}

const docSections: DocSection[] = [
  {
    title: 'Getting Started',
    links: [
      { id: 'introduction', label: 'Introduction', icon: '📖' },
      { id: 'installation', label: 'Installation', icon: '📦' },
      { id: 'quick-start', label: 'Quick Start', icon: '⚡' },
    ],
  },
  {
    title: 'Core Concepts',
    links: [
      { id: 'basic-usage', label: 'Basic Usage', icon: '🎯' },
      { id: 'field-configuration', label: 'Field Configuration', icon: '⚙️' },
      { id: 'aggregations', label: 'Aggregations', icon: '📊' },
      { id: 'drag-drop', label: 'Drag & Drop', icon: '🖱️' },
    ],
  },
  {
    title: 'API Reference',
    links: [
      { id: 'props-api', label: 'Props API', icon: '📚' },
      { id: 'pivot-table', label: 'PivotTable', icon: '🔲' },
      { id: 'pivot-field-list', label: 'PivotFieldList', icon: '📋' },
      { id: 'pivot-toolbar', label: 'PivotToolbar', icon: '🔧' },
    ],
  },
  {
    title: 'Customization',
    links: [
      { id: 'themes', label: 'Theme Options', icon: '🎨' },
      { id: 'styling', label: 'Custom Styling', icon: '💅' },
      { id: 'formatting', label: 'Data Formatting', icon: '🔢' },
    ],
  },
  {
    title: 'Features',
    links: [
      { id: 'exporting', label: 'Exporting Data', icon: '📤' },
      { id: 'totals', label: 'Grand Totals', icon: '∑' },
      { id: 'sorting', label: 'Sorting', icon: '🔽' },
    ],
  },
  {
    title: 'Examples',
    links: [
      { id: 'examples', label: 'Live Examples', icon: '🚀' },
      { id: 'code-examples', label: 'Code Examples', icon: '💻' },
      { id: 'use-cases', label: 'Use Cases', icon: '🎓' },
    ],
  },
];

export function DocsSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['Getting Started', 'Core Concepts'])
  );

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionTitle)) {
        next.delete(sectionTitle);
      } else {
        next.add(sectionTitle);
      }
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="docs-sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle documentation menu"
      >
        {isOpen ? '✕' : '☰'} Docs
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="docs-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`docs-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="docs-sidebar-header">
          <h2>📚 Documentation</h2>
          <a
            href="https://github.com/bhushanpoojary/react-pivot"
            target="_blank"
            rel="noopener noreferrer"
            className="docs-github-link"
            title="View on GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>

        <nav className="docs-sidebar-nav">
          {docSections.map((section) => (
            <div key={section.title} className="docs-sidebar-section">
              <button
                className="docs-section-title"
                onClick={() => toggleSection(section.title)}
              >
                <span className="docs-section-arrow">
                  {expandedSections.has(section.title) ? '▼' : '▶'}
                </span>
                {section.title}
              </button>
              {expandedSections.has(section.title) && (
                <ul className="docs-sidebar-links">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="docs-sidebar-link"
                      >
                        {link.icon && <span className="docs-link-icon">{link.icon}</span>}
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="docs-sidebar-footer">
          <a
            href="https://www.npmjs.com/package/react-pivot"
            target="_blank"
            rel="noopener noreferrer"
            className="docs-npm-badge"
          >
            <img
              src="https://img.shields.io/npm/v/react-pivot.svg"
              alt="npm version"
            />
          </a>
        </div>
      </aside>
    </>
  );
}
