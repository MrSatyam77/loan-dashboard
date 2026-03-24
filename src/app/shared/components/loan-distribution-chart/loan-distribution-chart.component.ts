import { Component, Input, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { LoanDistribution } from '../../interfaces/loan.interface';
import { LOAN_TYPE_COLORS, DEFAULT_LEGEND_ITEMS, DEFAULT_CHART_LABELS } from '../../constants/loan-data.constant';

@Component({
  selector: 'app-loan-distribution-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './loan-distribution-chart.component.html',
  styleUrl: './loan-distribution-chart.component.scss'
})
export class LoanDistributionChartComponent {
  @Input() set distribution(value: LoanDistribution[]) {
    this.updateChartData(value);
  }
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public legendItems: { label: string; color: string }[] = [...DEFAULT_LEGEND_ITEMS];

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [...DEFAULT_CHART_LABELS],
    datasets: [{
      data: [40, 35, 15, 10],
      backgroundColor: LOAN_TYPE_COLORS,
      borderWidth: 0,
      borderColor: 'transparent'
    }]
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value.toFixed(0)}%`;
          }
        }
      }
    },
    cutout: '70%'
  };

  private updateChartData(distribution: LoanDistribution[]): void {
    if (distribution?.length) {
      const labels = distribution.map(d => `${d.type} ${Math.round(d.percentage)}%`);
      const data = distribution.map(d => d.percentage);
      this.doughnutChartData = {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: LOAN_TYPE_COLORS,
          borderWidth: 0,
          borderColor: 'transparent'
        }]
      };
      this.legendItems = distribution.map((d, i) => ({
        label: `${d.type} ${Math.round(d.percentage)}%`,
        color: LOAN_TYPE_COLORS[i] || '#ccc'
      }));
      if (this.chart) {
        this.chart.update();
      }
    }
  }

  get totalTypes(): number {
    return this.doughnutChartData.labels?.length || 0;
  }
}
