import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../services/theme.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent, NoopAnimationsModule],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle theme on button click', () => {
    const initialTheme = themeService.getCurrentTheme();
    component.onToggle();
    const newTheme = themeService.getCurrentTheme();
    expect(newTheme).not.toBe(initialTheme);
  });

  it('should reflect current theme state', async () => {
    themeService.setTheme('dark');
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(component.isDarkMode).toBe(true);

    themeService.setTheme('light');
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(component.isDarkMode).toBe(false);
  });
});
