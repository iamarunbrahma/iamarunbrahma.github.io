import { useCallback, useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

const listeners = new Set<() => void>(); // Keep all subscribers aligned with the latest theme.

const readStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === 'dark' || value === 'light' ? value : null;
};

const prefersDark = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const resolveTheme = (): Theme => {
  const stored = readStoredTheme();
  if (stored) return stored;
  return prefersDark() ? 'dark' : 'light';
};

let currentTheme: Theme = resolveTheme();

const updateDocument = (next: Theme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', next === 'dark');
  }
};

const setThemeAndNotify = (next: Theme, options?: { persist?: boolean }) => {
  const persist = options?.persist ?? true;
  if (persist && typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  if (next === currentTheme) {
    updateDocument(next);
    return;
  }

  currentTheme = next;
  updateDocument(next);
  listeners.forEach((listener) => listener());
};

updateDocument(currentTheme);

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => currentTheme,
    () => 'light',
  );

  useEffect(() => {
    updateDocument(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const next = event.newValue === 'dark' ? 'dark' : event.newValue === 'light' ? 'light' : null;
      if (next) setThemeAndNotify(next, { persist: false });
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMedia = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) return;
      setThemeAndNotify(event.matches ? 'dark' : 'light', { persist: false });
    };

    window.addEventListener('storage', handleStorage);
    mediaQuery.addEventListener('change', handleMedia);

    return () => {
      window.removeEventListener('storage', handleStorage);
      mediaQuery.removeEventListener('change', handleMedia);
    };
  }, []);

  const toggle = useCallback(() => {
    setThemeAndNotify(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  return { theme, toggle } as const;
}
