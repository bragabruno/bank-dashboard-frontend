import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { OverallStats } from '../../../core/models/analytics.model';
import { Transaction } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Dashboard Overview</h2>

      <!-- Loading State -->
      <div *ngIf="loading" class="spinner"></div>

      <!-- Stats Cards -->
      <div *ngIf="!loading && stats" class="grid grid-4">
        <div class="stat-card">
          <div class="stat-card-label">Total Transactions</div>
          <div class="stat-card-value">{{ stats.total_transactions | number }}</div>
        </div>

        <div class="stat-card" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);">
          <div class="stat-card-label">Total Income</div>
          <div class="stat-card-value">\${{ stats.total_income | number:'1.2-2' }}</div>
        </div>

        <div class="stat-card" style="background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);">
          <div class="stat-card-label">Total Expenses</div>
          <div class="stat-card-value">\${{ stats.total_expenses | number:'1.2-2' }}</div>
        </div>

        <div class="stat-card" style="background: linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%);">
          <div class="stat-card-label">Banks</div>
          <div class="stat-card-value">{{ stats.bank_count }}</div>
        </div>
      </div>

      <!-- Additional Info -->
      <div *ngIf="!loading && stats" class="card mt-3">
        <div class="card-title">Summary</div>
        <div class="card-content">
          <p><strong>Average Transaction:</strong> \${{ stats.avg_transaction_amount | number:'1.2-2' }}</p>
          <p><strong>Date Range:</strong> {{ stats.date_range_start | date }} - {{ stats.date_range_end | date }}</p>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div *ngIf="!loading && recentTransactions.length" class="card mt-3">
        <div class="card-title">Recent Transactions</div>
        <div class="card-content">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Bank</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let txn of recentTransactions">
                <td>{{ txn.transaction_date | date:'MM/dd/yyyy' }}</td>
                <td>{{ txn.description }}</td>
                <td>{{ txn.bank_name }}</td>
                <td [class.text-green]="txn.amount > 0" [class.text-red]="txn.amount < 0">
                  \${{ txn.amount | number:'1.2-2' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .text-green { color: #38ef7d; font-weight: 600; }
    .text-red { color: #ff6a00; font-weight: 600; }
  `]
})
export class OverviewComponent implements OnInit {
  stats: OverallStats | null = null;
  recentTransactions: Transaction[] = [];
  loading = true;

  constructor(
    private analyticsService: AnalyticsService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    // Load stats
    this.analyticsService.getOverallStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading stats:', err);
        this.loading = false;
      }
    });

    // Load recent transactions
    this.transactionService.getTransactions({ page: 1, page_size: 10 }).subscribe({
      next: (data) => {
        this.recentTransactions = data.data;
      },
      error: (err) => console.error('Error loading transactions:', err)
    });
  }
}
