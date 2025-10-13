import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Bank } from '../models/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  constructor(private apiService: ApiService) {}

  getBanks(): Observable<Bank[]> {
    return this.apiService.get<Bank[]>('banks');
  }

  getBank(id: number): Observable<Bank> {
    return this.apiService.get<Bank>(`banks/${id}`);
  }
}
