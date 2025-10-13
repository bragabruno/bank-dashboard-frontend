import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  OverallStats,
  MonthlySummary,
  BankSummary,
  DateRangeAnalysis,
  AmountDistribution
} from '../models/analytics.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private apiService: ApiService) {}

  getOverallStats(): Observable<OverallStats> {
    return this.apiService.get<OverallStats>('analytics/stats');
  }

  getMonthlySummary(year: number): Observable<MonthlySummary[]> {
    return this.apiService.get<MonthlySummary[]>('analytics/monthly', { year });
  }

  getBankSummary(): Observable<BankSummary[]> {
    return this.apiService.get<BankSummary[]>('analytics/by-bank');
  }

  getDateRangeAnalysis(startDate: string, endDate: string): Observable<DateRangeAnalysis> {
    return this.apiService.get<DateRangeAnalysis>('analytics/date-range', {
      start: startDate,
      end: endDate
    });
  }

  getAmountDistribution(): Observable<AmountDistribution[]> {
    return this.apiService.get<AmountDistribution[]>('analytics/amount-distribution');
  }
}
