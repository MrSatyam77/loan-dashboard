export type LoanStatus = 'Active' | 'Closed' | 'Default' | 'Review';
export type LoanType = 'Residential' | 'Commercial' | 'Auto' | 'Personal';

export interface Loan {
  id: string;
  borrowerName: string;
  amount: number;
  rate: number;
  status: LoanStatus;
  date: string;
  type: LoanType;
}
export interface SummaryCard {
  label: string;
  value: string | number;
  trend: string;
  icon?: string;
}

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

export interface LoanDistribution {
  type: LoanType;
  count: number;
  percentage: number;
}

export interface LegendItem {
  label: string;
  color: string;
}
