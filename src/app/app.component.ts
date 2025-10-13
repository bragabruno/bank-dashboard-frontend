import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <h1>💰 Bank Transactions Dashboard</h1>
          <nav class="nav">
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/dashboard/transactions" routerLinkActive="active">Transactions</a>
            <a routerLink="/dashboard/analytics" routerLinkActive="active">Analytics</a>
          </nav>
        </div>
      </header>
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <p>&copy; 2024 Bank Dashboard. Built with Angular & FastAPI</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .header-content h1 {
      margin: 0 0 15px 0;
      font-size: 28px;
      font-weight: 600;
    }

    .nav {
      display: flex;
      gap: 20px;
    }

    .nav a {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 6px;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .nav a:hover,
    .nav a.active {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .app-content {
      flex: 1;
      padding: 30px 0;
      background: #f5f5f5;
    }

    .app-footer {
      background: #2c3e50;
      color: rgba(255, 255, 255, 0.7);
      text-align: center;
      padding: 20px;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .header-content h1 {
        font-size: 20px;
        margin-bottom: 10px;
      }

      .nav {
        flex-direction: column;
        gap: 10px;
      }

      .nav a {
        display: block;
        text-align: center;
      }
    }
  `]
})
export class AppComponent {
  title = 'Bank Dashboard';
}
