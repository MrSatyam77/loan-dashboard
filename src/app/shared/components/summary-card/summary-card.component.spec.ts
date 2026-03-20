import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { SummaryCardComponent } from './summary-card.component';

describe('SummaryCardComponent', () => {
  let component: SummaryCardComponent;
  let fixture: ComponentFixture<SummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryCardComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCardComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.value = 1000;
    component.trend = '+5%';
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct label and value', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-label').textContent).toContain('Test Label');
    expect(compiled.querySelector('.card-value').textContent).toContain('1000');
  });

  it('should apply positive trend class for positive values', async () => {
    component.trend = '+5%';
    await fixture.whenStable();
    const trendElement = fixture.nativeElement.querySelector('.card-trend');
    expect(trendElement.classList.contains('positive')).toBe(true);
    expect(component.isPositiveTrend).toBe(true);
  });

  it('should apply negative trend class for negative values', async () => {
    component.trend = '-2%';
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    const trendElement = fixture.nativeElement.querySelector('.card-trend');
    expect(trendElement.classList.contains('negative')).toBe(true);
    expect(component.isPositiveTrend).toBe(false);
  });

  it('should render icon when icon input is provided', async () => {
    component.icon = 'account_balance';
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    const iconElement = fixture.nativeElement.querySelector('.card-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent).toContain('account_balance');
  });

  it('should hide icon when icon input is not provided', async () => {
    component.icon = undefined;
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    const iconElement = fixture.nativeElement.querySelector('.card-icon');
    expect(iconElement).toBeFalsy();
  });
});
