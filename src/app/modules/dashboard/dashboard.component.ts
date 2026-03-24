import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { SummaryCardComponent } from '../../shared/components/summary-card/summary-card.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { LoanDistributionChartComponent } from '../../shared/components/loan-distribution-chart/loan-distribution-chart.component';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { LoanDataService } from '../../shared/services/loan-data.service';
import { ConfirmationDialogComponent } from '../../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    SummaryCardComponent,
    DataTableComponent,
    LoanDistributionChartComponent,
    ThemeToggleComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private loanDataService = inject(LoanDataService);
  private dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private searchTerm$ = new Subject<string>();
  summaryCards = this.loanDataService.summaryCards;
  filteredLoans = this.loanDataService.filteredLoans;
  loanDistribution = this.loanDataService.loanDistribution;
  searchTerm = '';

  constructor() {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.loanDataService.setSearchTerm(value);
      });
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.searchTerm$.next(value);
  }

  onDeleteLoan(loanId: string): void {
    const loan = this.loanDataService.loans().find(l => l.id === loanId);
    if (!loan) return;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '23.125rem',
      maxWidth: '90vw',
      data: {
        title: 'Delete loan record?',
        message: `This will permanently remove ${loanId} (${loan.borrowerName}) from the portfolio. This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanDataService.deleteLoan(loanId);
      }
    });
  }
}
