import { Loan, TableColumn } from '../interfaces/loan.interface';

export const LOAN_COLUMNS: TableColumn[] = [
  { key: 'id', header: 'Loan ID', sortable: true },
  { key: 'borrowerName', header: 'Borrower', sortable: true },
  { key: 'amount', header: 'Amount', sortable: true, type: 'currency' },
  { key: 'rate', header: 'Rate', sortable: true, type: 'percentage' },
  { key: 'status', header: 'Status', sortable: true, type: 'status' },
  { key: 'date', header: 'Date', sortable: true, type: 'date' }
];

export const MOCK_LOANS: Loan[] = [
  { id: 'LN-0001', borrowerName: 'James Carter', amount: 312000, rate: 5.2, status: 'Active', date: '2024-01-15', type: 'Residential' },
  { id: 'LN-0002', borrowerName: 'Maria Garcia', amount: 125000, rate: 4.8, status: 'Active', date: '2024-01-20', type: 'Auto' },
  { id: 'LN-0003', borrowerName: 'Robert Johnson', amount: 450000, rate: 6.1, status: 'Active', date: '2024-01-25', type: 'Commercial' },
  { id: 'LN-0004', borrowerName: 'Linda Martinez', amount: 275000, rate: 5.5, status: 'Closed', date: '2024-02-01', type: 'Residential' },
  { id: 'LN-0005', borrowerName: 'Michael Brown', amount: 35000, rate: 7.2, status: 'Active', date: '2024-02-05', type: 'Personal' },
  { id: 'LN-0006', borrowerName: 'Patricia Davis', amount: 380000, rate: 5.9, status: 'Active', date: '2024-02-10', type: 'Commercial' },
  { id: 'LN-0007', borrowerName: 'David Wilson', amount: 195000, rate: 5.0, status: 'Active', date: '2024-02-15', type: 'Residential' },
  { id: 'LN-0008', borrowerName: 'Jennifer Moore', amount: 28500, rate: 6.8, status: 'Default', date: '2024-02-20', type: 'Auto' },
  { id: 'LN-0009', borrowerName: 'Christopher Taylor', amount: 520000, rate: 6.5, status: 'Active', date: '2024-02-25', type: 'Commercial' },
  { id: 'LN-0010', borrowerName: 'Sarah Anderson', amount: 245000, rate: 5.3, status: 'Closed', date: '2024-03-01', type: 'Residential' },
  { id: 'LN-0011', borrowerName: 'Daniel Thomas', amount: 42000, rate: 7.5, status: 'Review', date: '2024-03-05', type: 'Personal' },
  { id: 'LN-0012', borrowerName: 'Jessica Jackson', amount: 315000, rate: 5.4, status: 'Active', date: '2024-03-10', type: 'Residential' },
  { id: 'LN-0013', borrowerName: 'Matthew White', amount: 475000, rate: 6.2, status: 'Active', date: '2024-03-15', type: 'Commercial' },
  { id: 'LN-0014', borrowerName: 'Ashley Harris', amount: 32500, rate: 6.9, status: 'Active', date: '2024-03-20', type: 'Auto' },
  { id: 'LN-0015', borrowerName: 'Joshua Martin', amount: 285000, rate: 5.6, status: 'Active', date: '2024-03-25', type: 'Residential' },
  { id: 'LN-0016', borrowerName: 'Amanda Thompson', amount: 410000, rate: 6.0, status: 'Closed', date: '2024-04-01', type: 'Commercial' },
  { id: 'LN-0017', borrowerName: 'Andrew Garcia', amount: 225000, rate: 5.1, status: 'Active', date: '2024-04-05', type: 'Residential' },
  { id: 'LN-0018', borrowerName: 'Stephanie Martinez', amount: 29800, rate: 7.0, status: 'Active', date: '2024-04-10', type: 'Auto' },
  { id: 'LN-0019', borrowerName: 'Ryan Robinson', amount: 495000, rate: 6.3, status: 'Active', date: '2024-04-15', type: 'Commercial' },
  { id: 'LN-0020', borrowerName: 'Nicole Clark', amount: 265000, rate: 5.4, status: 'Default', date: '2024-04-20', type: 'Residential' },
  { id: 'LN-0021', borrowerName: 'Brandon Rodriguez', amount: 385000, rate: 5.8, status: 'Active', date: '2024-04-25', type: 'Commercial' },
  { id: 'LN-0022', borrowerName: 'Megan Lewis', amount: 215000, rate: 5.2, status: 'Active', date: '2024-05-01', type: 'Residential' },
  { id: 'LN-0023', borrowerName: 'Jason Lee', amount: 445000, rate: 6.1, status: 'Review', date: '2024-05-05', type: 'Commercial' },
  { id: 'LN-0024', borrowerName: 'Lauren Walker', amount: 295000, rate: 5.5, status: 'Active', date: '2024-05-10', type: 'Residential' },
  { id: 'LN-0025', borrowerName: 'Kevin Hall', amount: 365000, rate: 5.9, status: 'Active', date: '2024-05-15', type: 'Commercial' },
];

export const STATUS_COLORS: Record<string, string> = {
  'Active': 'green',
  'Closed': 'gray',
  'Default': 'red',
  'Review': 'amber'
};

export const LOAN_TYPE_COLORS: string[] = [
  '#4CAF50', 
  '#2196F3',
  '#FF9800',
  '#E91E63'
];

export const DEFAULT_CHART_LABELS: string[] = [
  'Residential 40%',
  'Commercial 35%',
  'Auto 15%',
  'Personal 10%'
];

export const DEFAULT_LEGEND_ITEMS: { label: string; color: string }[] = [
  { label: DEFAULT_CHART_LABELS[0], color: LOAN_TYPE_COLORS[0] },
  { label: DEFAULT_CHART_LABELS[1], color: LOAN_TYPE_COLORS[1] },
  { label: DEFAULT_CHART_LABELS[2], color: LOAN_TYPE_COLORS[2] },
  { label: DEFAULT_CHART_LABELS[3], color: LOAN_TYPE_COLORS[3] },
];
