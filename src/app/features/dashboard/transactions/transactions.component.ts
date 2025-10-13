import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { BankService } from '../../../core/services/bank.service';
import { Transaction, TransactionFilter } from '../../../core/models/transaction.model';
import { Bank } from '../../../core/models/bank.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Transactions</h2>

      <!-- Filters -->
      <div class="card">
        <div class="card-title">Filters</div>
        <div class="card-content">
          <div class="grid grid-4">
            <div>
              <label>Search</label>
              <input [(ngModel)]="filters.search" (ngModelChange)="applyFilters()"
                     type="text" placeholder="Search description...">
            </div>
            <div>
              <label>Bank</label>
              <select [(ngModel)]="filters.bank_id" (ngModelChange)="applyFilters()">
                <option [ngValue]="undefined">All Banks</option>
                <option *ngFor="let bank of banks" [ngValue]="bank.id">
                  {{ bank.display_name || bank.name }}
                </option>
              </select>
            </div>
            <div>
              <label>Start Date</label>
              <input [(ngModel)]="filters.start_date" (ngModelChange)="applyFilters()" type="date">
            </div>
            <div>
              <label>End Date</label>
              <input [(ngModel)]="filters.end_date" (ngModelChange)="applyFilters()" type="date">
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="spinner"></div>

      <!-- Transactions Table -->
      <div *ngIf="!loading" class="card mt-3">
        <div class="card-title">
          Transactions ({{ totalRecords }} total)
        </div>
        <div class="card-content">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Bank</th>
                <th>Account</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let txn of transactions">
                <td>{{ txn.transaction_date | date:'MM/dd/yyyy' }}</td>
                <td>{{ txn.description | slice:0:80 }}{{ txn.description.length > 80 ? '...' : '' }}</td>
                <td>{{ txn.bank_name }}</td>
                <td>{{ txn.account_number }}</td>
                <td>{{ txn.transaction_type }}</td>
                <td [class.text-green]="txn.amount > 0" [class.text-red]="txn.amount < 0">
                  \${{ txn.amount | number:'1.2-2' }}
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="pagination" *ngIf="totalPages > 1">
            <button (click)="previousPage()" [disabled]="currentPage === 1" class="btn btn-secondary">
              Previous
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button (click)="nextPage()" [disabled]="currentPage === totalPages" class="btn btn-secondary">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
    }

    .text-green { color: #38ef7d; font-weight: 600; }
    .text-red { color: #ff6a00; font-weight: 600; }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #495057;
    }
  `]
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  banks: Bank[] = [];
  loading = true;

  filters: TransactionFilter = {
    page: 1,
    page_size: 50
  };

  currentPage = 1;
  totalPages = 1;
  totalRecords = 0;

  constructor(
    private transactionService: TransactionService,
    private bankService: BankService
  ) {}

  ngOnInit() {
    this.loadBanks();
    this.loadTransactions();
  }

  loadBanks() {
    this.bankService.getBanks().subscribe({
      next: (data) => this.banks = data,
      error: (err) => console.error('Error loading banks:', err)
    });
  }

  loadTransactions() {
    this.loading = true;
    this.transactionService.getTransactions(this.filters).subscribe({
      next: (response) => {
        this.transactions = response.data;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
        this.totalRecords = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filters.page = 1;
    this.loadTransactions();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.filters.page = (this.filters.page || 1) + 1;
      this.loadTransactions();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.filters.page = (this.filters.page || 2) - 1;
      this.loadTransactions();
    }
  }
}
