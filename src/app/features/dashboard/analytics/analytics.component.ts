import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { MonthlySummary, BankSummary, AmountDistribution } from '../../../core/models/analytics.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  template: `
    <div class="container">
      <h2>Analytics Dashboard</h2>

      <div *ngIf="loading" class="spinner"></div>

      <!-- Charts Grid -->
      <div *ngIf="!loading" class="grid grid-2">

        <!-- Monthly Trends -->
        <div class="card">
          <div class="card-title">Monthly Trends (2024)</div>
          <div class="card-content">
            <ngx-charts-line-chart
              *ngIf="monthlyChartData.length"
              [view]="[600, 300]"
              [results]="monthlyChartData"
              [xAxis]="true"
              [yAxis]="true"
              [legend]="true"
              [showXAxisLabel]="true"
              [showYAxisLabel]="true"
              xAxisLabel="Month"
              yAxisLabel="Amount ($)"
              [timeline]="false">
            </ngx-charts-line-chart>
          </div>
        </div>

        <!-- Bank Distribution -->
        <div class="card">
          <div class="card-title">Bank Distribution</div>
          <div class="card-content">
            <ngx-charts-pie-chart
              *ngIf="bankChartData.length"
              [view]="[600, 300]"
              [results]="bankChartData"
              [legend]="true"
              [labels]="true"
              [doughnut]="true">
            </ngx-charts-pie-chart>
          </div>
        </div>

        <!-- Amount Distribution -->
        <div class="card">
          <div class="card-title">Transaction Amount Distribution</div>
          <div class="card-content">
            <ngx-charts-bar-vertical
              *ngIf="amountChartData.length"
              [view]="[600, 300]"
              [results]="amountChartData"
              [xAxis]="true"
              [yAxis]="true"
              [legend]="false"
              [showXAxisLabel]="true"
              [showYAxisLabel]="true"
              xAxisLabel="Amount Range"
              yAxisLabel="Count">
            </ngx-charts-bar-vertical>
          </div>
        </div>

        <!-- Bank Summary Table -->
        <div class="card">
          <div class="card-title">Bank Summary</div>
          <div class="card-content">
            <table *ngIf="bankSummaries.length">
              <thead>
                <tr>
                  <th>Bank</th>
                  <th>Transactions</th>
                  <th>Total</th>
                  <th>Avg</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let bank of bankSummaries">
                  <td>{{ bank.bank_name }}</td>
                  <td>{{ bank.transaction_count | number }}</td>
                  <td>\${{ bank.total_amount | number:'1.2-2' }}</td>
                  <td>\${{ bank.avg_transaction | number:'1.2-2' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .ngx-charts {
      text {
        fill: #333 !important;
      }
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  loading = true;

  // Chart data
  monthlyChartData: any[] = [];
  bankChartData: any[] = [];
  amountChartData: any[] = [];

  // Raw data
  monthlySummaries: MonthlySummary[] = [];
  bankSummaries: BankSummary[] = [];
  amountDistribution: AmountDistribution[] = [];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.loading = true;
    const currentYear = new Date().getFullYear();

    // Load monthly summary
    this.analyticsService.getMonthlySummary(currentYear).subscribe({
      next: (data) => {
        this.monthlySummaries = data;
        this.prepareMonthlyChart(data);
      },
      error: (err) => console.error('Error loading monthly summary:', err)
    });

    // Load bank summary
    this.analyticsService.getBankSummary().subscribe({
      next: (data) => {
        this.bankSummaries = data;
        this.prepareBankChart(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bank summary:', err);
        this.loading = false;
      }
    });

    // Load amount distribution
    this.analyticsService.getAmountDistribution().subscribe({
      next: (data) => {
        this.amountDistribution = data;
        this.prepareAmountChart(data);
      },
      error: (err) => console.error('Error loading amount distribution:', err)
    });
  }

  prepareMonthlyChart(data: MonthlySummary[]) {
    const income = {
      name: 'Income',
      series: data.map(m => ({
        name: m.month_name.substring(0, 3),
        value: +m.income
      }))
    };

    const expenses = {
      name: 'Expenses',
      series: data.map(m => ({
        name: m.month_name.substring(0, 3),
        value: +m.expenses
      }))
    };

    this.monthlyChartData = [income, expenses];
  }

  prepareBankChart(data: BankSummary[]) {
    this.bankChartData = data.map(bank => ({
      name: bank.bank_name,
      value: +bank.transaction_count
    }));
  }

  prepareAmountChart(data: AmountDistribution[]) {
    this.amountChartData = data.map(dist => ({
      name: dist.range_label,
      value: dist.transaction_count
    }));
  }
}
