# Bank Dashboard - Frontend

Angular web application for the Bank Dashboard. Provides an intuitive interface for viewing transactions, analytics, and managing bank account data.

## Tech Stack

- **Angular 18** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **Nginx** - Production web server

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/           # Core services and models
│   │   │   ├── models/     # TypeScript interfaces
│   │   │   └── services/   # API services
│   │   ├── features/       # Feature modules
│   │   │   └── dashboard/  # Dashboard components
│   │   ├── app.component.* # Root component
│   │   ├── app.config.ts   # App configuration
│   │   └── app.routes.ts   # Routing configuration
│   ├── environments/       # Environment configs
│   └── main.ts            # Application entry point
├── angular.json           # Angular CLI config
├── package.json           # NPM dependencies
└── nginx.conf            # Production server config
```

## Setup

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
# Or: ng serve

# Navigate to http://localhost:4200
```

### Production Build

```bash
# Build for production
npm run build
# Or: ng build --configuration production

# Output will be in dist/
```

### Docker

```bash
# Using docker-compose (from project root)
docker-compose up frontend

# Or build and run directly
docker build -t bank-frontend .
docker run -p 4200:80 bank-frontend
```

## Environment Configuration

Edit `src/environments/environment.ts` for development and `src/environments/environment.prod.ts` for production:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
```

## Related Repositories

- **Backend**: bank-dashboard-backend
- **Commons**: bank-dashboard-commons (shared resources)
