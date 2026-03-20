import { Injectable, PLATFORM_ID, inject, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'loan-dashboard-theme';
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private themeSignal = signal<Theme>(this.loadThemeFromStorage());
  readonly isDarkMode = signal<boolean>(this.themeSignal() === 'dark');

  constructor() {
    this.applyTheme(this.themeSignal());
    effect(() => {
      const theme = this.themeSignal();
      this.applyTheme(theme);
      this.isDarkMode.set(theme === 'dark');
    });
  }

  toggleTheme(): void {
    const newTheme: Theme = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.themeSignal.set(newTheme);
    this.saveThemeToStorage(newTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    this.saveThemeToStorage(theme);
  }

  getCurrentTheme(): Theme {
    return this.themeSignal();
  }

  private applyTheme(theme: Theme): void {
    if (this.isBrowser) {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
    }
  }

  private loadThemeFromStorage(): Theme {
    if (this.isBrowser) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    }
    return 'light';
  }

  private saveThemeToStorage(theme: Theme): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }
}
