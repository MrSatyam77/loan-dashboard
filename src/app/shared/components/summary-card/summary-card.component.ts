import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [MatIconModule, MatCardModule],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() trend!: string;
  @Input() icon?: string;

  get isPositiveTrend(): boolean {
    return this.trend.startsWith('+');
  }
}
