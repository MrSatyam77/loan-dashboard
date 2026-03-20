import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, NoopAnimationsModule],
      providers: [provideZonelessChangeDetection(), provideCharts(withDefaultRegisterables())]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display summary cards', () => {
    expect(component.summaryCards().length).toBe(4);
  });

  it('should filter loans on search', () => {
    component.onSearchChange('LN-0001');
    expect(component.filteredLoans().length).toBeGreaterThan(0);
  });

  it('should have initial loan data', () => {
    expect(component.filteredLoans().length).toBeGreaterThan(0);
  });
});
