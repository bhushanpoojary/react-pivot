interface CodeHighlightProps {
  code: string;
  language: 'typescript' | 'javascript';
}

export function CodeHighlight({ code, language }: CodeHighlightProps) {
  const highlightCode = (code: string, lang: 'typescript' | 'javascript') => {
    // Escape HTML first
    let html = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Comments (do first to avoid highlighting inside comments)
    html = html.replace(/\/\/.*$/gm, (match) => `<span class="comment">${match}</span>`);
    html = html.replace(/\/\*[\s\S]*?\*\//g, (match) => `<span class="comment">${match}</span>`);

    // Strings (single and double quotes) - avoid already highlighted content
    html = html.replace(/(['"`])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      if (match.includes('class="')) return match; // Skip if already highlighted
      return `<span class="string">${match}</span>`;
    });

    // Keywords
    const keywords = [
      'import', 'from', 'export', 'default', 'const', 'let', 'var', 'function',
      'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
      'continue', 'try', 'catch', 'throw', 'new', 'this', 'class', 'extends',
      'async', 'await', 'type', 'interface', 'enum', 'as'
    ];

    keywords.forEach(keyword => {
      const regex = new RegExp(`(?<!<span[^>]*>)(?<!-)\\b(${keyword})\\b(?![^<]*<\\/span>)`, 'g');
      html = html.replace(regex, (match, p1) => {
        if (match.includes('class="')) return match;
        return `<span class="keyword">${p1}</span>`;
      });
    });

    // Boolean and special values
    html = html.replace(/(?<!<span[^>]*>)\b(true|false|null|undefined)\b(?![^<]*<\/span>)/g, (match, p1) => {
      if (match.includes('class="')) return match;
      return `<span class="boolean">${p1}</span>`;
    });

    // Numbers
    html = html.replace(/(?<!<span[^>]*>)\b(\d+)\b(?![^<]*<\/span>)/g, (match, p1) => {
      if (match.includes('class="')) return match;
      return `<span class="number">${p1}</span>`;
    });

    // Type annotations (TypeScript) - e.g., : PivotConfig
    if (lang === 'typescript') {
      html = html.replace(/:\s*([A-Z][a-zA-Z0-9_<>[\]|]*)/g, (match, p1) => {
        if (match.includes('class="')) return match;
        return `: <span class="type">${p1}</span>`;
      });
    }

    // Function/Component names (capitalized or followed by parentheses)
    html = html.replace(/\b([A-Z][a-zA-Z0-9_]*|[a-z][a-zA-Z0-9_]*)\s*(?=\()/g, (match, p1) => {
      if (match.includes('class="')) return match;
      return `<span class="function">${p1}</span>`;
    });

    // JSX/HTML tags
    html = html.replace(/&lt;(\/?[A-Z][a-zA-Z0-9]*)/g, '&lt;<span class="tag">$1</span>');
    html = html.replace(/&lt;(\/?[a-z][a-zA-Z0-9]*)/g, '&lt;<span class="tag">$1</span>');
    html = html.replace(/(\/)&gt;/g, '<span class="tag">$1</span>&gt;');

    // Properties (after dot notation)
    html = html.replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g, (match, p1) => {
      if (match.includes('class="')) return match;
      return `.<span class="property">${p1}</span>`;
    });

    return html;
  };

  const highlightedCode = highlightCode(code, language);

  return (
    <pre className="code-highlight">
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </pre>
  );
}
