export interface Theme {
  id: string;
  name: string;
  description: string;
}

export const themes: Theme[] = [
  { id: 'quartz', name: 'Quartz (Modern White)', description: 'Clean and modern default theme' },
  { id: 'alpine', name: 'Alpine (Classic Business)', description: 'Professional business theme' },
  { id: 'material', name: 'Material', description: 'Google Material Design inspired' },
  { id: 'dark', name: 'Dark Mode', description: 'Easy on the eyes dark theme' },
  { id: 'nord', name: 'Nord (Arctic)', description: 'Arctic, north-bluish color palette' },
  { id: 'dracula', name: 'Dracula', description: 'Popular dark theme with purple accents' },
  { id: 'solarized-light', name: 'Solarized Light', description: 'Precision colors for machines and people' },
  { id: 'solarized-dark', name: 'Solarized Dark', description: 'Dark variant of Solarized' },
  { id: 'monokai', name: 'Monokai', description: 'Iconic code editor theme' },
  { id: 'one-dark', name: 'One Dark', description: 'Atom editor inspired theme' },
];

export function applyTheme(themeId: string): void {
  const root = document.documentElement;
  if (themeId === 'quartz') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', themeId);
  }
}

export function getStoredTheme(): string {
  return localStorage.getItem('pivot-theme') || 'quartz';
}

export function setStoredTheme(themeId: string): void {
  localStorage.setItem('pivot-theme', themeId);
  applyTheme(themeId);
}
