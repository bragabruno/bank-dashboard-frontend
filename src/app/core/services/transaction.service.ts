import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Transaction, TransactionFilter, TransactionResponse } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private apiService: ApiService) {}

  getTransactions(filters?: TransactionFilter): Observable<TransactionResponse> {
    return this.apiService.get<TransactionResponse>('transactions', filters);
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.apiService.get<Transaction>(`transactions/${id}`);
  }

  searchTransactions(query: string, limit: number = 100): Observable<Transaction[]> {
    return this.apiService.get<Transaction[]>('transactions/search', { q: query, limit });
  }
}
