import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { LoanDistributionChartComponent } from './loan-distribution-chart.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

describe('LoanDistributionChartComponent', () => {
  let component: LoanDistributionChartComponent;
  let fixture: ComponentFixture<LoanDistributionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanDistributionChartComponent],
      providers: [provideZonelessChangeDetection(), provideCharts(withDefaultRegisterables())]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanDistributionChartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial chart data', () => {
    expect(component.doughnutChartData.labels?.length).toBe(4);
    expect(component.doughnutChartData.datasets[0].data.length).toBe(4);
  });

  it('should calculate total types correctly', () => {
    expect(component.totalTypes).toBe(4);
  });

  it('should update chart data when distribution input changes', async () => {
    const mockDistribution = [
      { type: 'Residential' as const, count: 10, percentage: 50 },
      { type: 'Commercial' as const, count: 10, percentage: 50 }
    ];
    component.distribution = mockDistribution;
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(component.doughnutChartData.datasets[0].data).toEqual([50, 50]);
  });
});
