import { Injectable, signal, computed } from '@angular/core';
import { Loan, LoanDistribution, SummaryCard } from '../interfaces/loan.interface';
import { MOCK_LOANS } from '../constants/loan-data.constant';

@Injectable({
  providedIn: 'root'
})
export class LoanDataService {
  private loansSignal = signal<Loan[]>([...MOCK_LOANS]);
  private searchTermSignal = signal<string>('');
  readonly loans = this.loansSignal.asReadonly();
  readonly searchTerm = this.searchTermSignal.asReadonly();

  readonly filteredLoans = computed(() => {
    const search = this.searchTermSignal().toLowerCase();
    if (!search) {
      return this.loansSignal();
    }
    return this.loansSignal().filter(loan =>
      loan.id.toLowerCase().includes(search) ||
      loan.borrowerName.toLowerCase().includes(search)
    );
  });

  readonly summaryCards = computed((): SummaryCard[] => {
    const loans = this.filteredLoans();
    const activeLoans = loans.filter(l => l.status === 'Active');
    const defaultLoans = loans.filter(l => l.status === 'Default');
    const avgLoanSize = loans.length > 0 
      ? loans.reduce((sum, l) => sum + l.amount, 0) / loans.length 
      : 0;
    return [
      {
        label: 'Total Loans',
        value: loans.length,
        trend: '+3.2%',
        icon: 'credit_card'
      },
      {
        label: 'Active Loans',
        value: activeLoans.length,
        trend: '+1.8%',
        icon: 'schedule'
      },
      {
        label: 'Default Rate',
        value: loans.length > 0 
          ? `${((defaultLoans.length / loans.length) * 100).toFixed(1)}%`
          : '0%',
        trend: '-0.5%',
        icon: 'warning_amber'
      },
      {
        label: 'Avg. Loan Size',
        value: `$${Math.round(avgLoanSize).toLocaleString()}`,
        trend: '+4.1%',
        icon: 'height'
      }
    ];
  });

  readonly loanDistribution = computed((): LoanDistribution[] => {
    const loans = this.filteredLoans();
    const total = loans.length;
    const typeCounts = loans.reduce((acc, loan) => {
      acc[loan.type] = (acc[loan.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return [
      { type: 'Residential', count: typeCounts['Residential'] || 0, percentage: total > 0 ? (typeCounts['Residential'] || 0) / total * 100 : 0 },
      { type: 'Commercial', count: typeCounts['Commercial'] || 0, percentage: total > 0 ? (typeCounts['Commercial'] || 0) / total * 100 : 0 },
      { type: 'Auto', count: typeCounts['Auto'] || 0, percentage: total > 0 ? (typeCounts['Auto'] || 0) / total * 100 : 0 },
      { type: 'Personal', count: typeCounts['Personal'] || 0, percentage: total > 0 ? (typeCounts['Personal'] || 0) / total * 100 : 0 },
    ];
  });

  setSearchTerm(term: string): void {
    this.searchTermSignal.set(term);
  }

  deleteLoan(id: string): void {
    this.loansSignal.update(loans => loans.filter(loan => loan.id !== id));
  }

  resetData(): void {
    this.loansSignal.set([...MOCK_LOANS]);
    this.searchTermSignal.set('');
  }
}
