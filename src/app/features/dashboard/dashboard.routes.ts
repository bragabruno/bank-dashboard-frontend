import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent)
  },
  {
    path: 'transactions',
    loadComponent: () => import('./transactions/transactions.component').then(m => m.TransactionsComponent)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./analytics/analytics.component').then(m => m.AnalyticsComponent)
  }
];
