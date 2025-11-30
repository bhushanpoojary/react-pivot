import { useState } from 'react';
import { themes, getStoredTheme, setStoredTheme } from '../lib/themes';

export interface ThemeSelectorProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeSelector({ className = '', showLabel = true }: ThemeSelectorProps) {
  const [currentTheme, setCurrentTheme] = useState<string>(() => getStoredTheme());

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value;
    setCurrentTheme(newTheme);
    setStoredTheme(newTheme);
  };

  return (
    <div className={`theme-selector ${className}`}>
      {showLabel && <label htmlFor="theme-select" className="theme-selector-label">Theme:</label>}
      <select
        id="theme-select"
        value={currentTheme}
        onChange={handleThemeChange}
        className="theme-selector-dropdown"
      >
        {themes.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
}
