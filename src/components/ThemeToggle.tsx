import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      aria-pressed={theme === 'dark'}
      className="inline-flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 px-3 py-2 bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-sm hover:bg-white/80 dark:hover:bg-white/15 transition text-[var(--fg-contrast)] dark:text-[var(--fg-contrast)]"
      onClick={toggle}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="text-sm hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
