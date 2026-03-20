import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent, NoopAnimationsModule],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct number of columns', () => {
    expect(component.displayedColumns.length).toBe(7);
  });

  it('should format currency correctly', () => {
    expect(component.formatCurrency(100000)).toBe('$100,000');
  });

  it('should format rate correctly', () => {
    expect(component.formatRate(5.25)).toBe('5.3%');
  });

  it('should emit delete event when delete button clicked', () => {
    spyOn(component.deleteLoan, 'emit');
    const loan = {
      id: 'LN-0001',
      borrowerName: 'Test',
      amount: 100000,
      rate: 5.0,
      status: 'Active' as const,
      date: '2024-01-01',
      type: 'Residential' as const
    };
    component.onDeleteClick(loan);
    expect(component.deleteLoan.emit).toHaveBeenCalledWith('LN-0001');
  });
});
