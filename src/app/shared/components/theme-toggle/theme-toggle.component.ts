import { Component, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);
  
  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  onToggle(): void {
    this.themeService.toggleTheme();
  }
}
