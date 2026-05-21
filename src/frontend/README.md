# FinWise AI - Frontend

Frontend application for FinWise AI, a fintech platform for personal finance management.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Recharts** - Chart library for data visualization
- **next-themes** - Theme management (dark/light mode)
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── auth/              # Authentication components
│   │   ├── AuthCard.jsx
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── charts/            # Chart components (Recharts)
│   │   ├── ExpensesChart.jsx
│   │   ├── IncomeExpenseChart.jsx
│   │   ├── BudgetChart.jsx
│   │   └── SavingsChart.jsx
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── FinancialCard.jsx
│   │   ├── RecentTransactions.jsx
│   │   ├── SavingsGoals.jsx
│   │   ├── Sidebar.jsx
│   │   └── Navbar.jsx
│   ├── goals/             # Goals page components
│   │   ├── GoalCard.jsx
│   │   └── GoalProgress.jsx
│   ├── budgets/           # Budgets page components
│   │   ├── BudgetCard.jsx
│   │   └── BudgetProgress.jsx
│   ├── transactions/      # Transactions page components
│   │   ├── TransactionTable.jsx
│   │   ├── TransactionFilters.jsx
│   │   └── AddTransactionDialog.jsx
│   ├── shared/            # Reusable shared components
│   │   ├── PageHeader.jsx
│   │   ├── EmptyState.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── StatsCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Skeleton.jsx
│   │   ├── CardSkeleton.jsx
│   │   ├── TableSkeleton.jsx
│   │   └── ThemeToggle.jsx
│   └── ui/                # shadcn/ui components
│       └── button.jsx
├── context/
│   ├── AuthContext.jsx     # Authentication context
│   └── ThemeContext.jsx   # Theme context
├── layouts/
│   ├── DashboardLayout.jsx # Main dashboard layout
│   └── AuthLayout.jsx      # Authentication layout
├── pages/
│   ├── auth/               # Authentication pages
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── dashboard/          # Dashboard page
│   │   └── DashboardPage.jsx
│   ├── transactions/      # Transactions management
│   │   └── TransactionsPage.jsx
│   ├── budgets/            # Budgets management
│   │   └── BudgetsPage.jsx
│   ├── goals/              # Savings goals
│   │   └── GoalsPage.jsx
│   └── reports/            # Financial reports
│       └── ReportsPage.jsx
├── routes/
│   └── AppRouter.jsx       # Routing configuration
├── services/
│   ├── api.js              # Axios instance configuration
│   ├── authService.js      # Authentication API calls
│   ├── transactionService.js # Transactions API calls
│   ├── budgetService.js    # Budgets API calls
│   ├── goalService.js      # Goals API calls
│   └── reportService.js    # Reports API calls
├── lib/
│   └── utils.js            # Utility functions (cn)
└── App.jsx                 # Root component
```

## Features Implemented

### Authentication
- Login page with form validation
- Registration page with form validation
- Password visibility toggle
- Error handling and display
- Mock authentication (to be replaced with real backend)
- Protected routes - redirects unauthenticated users to login

### Dashboard
- Financial summary cards (Balance, Income, Expenses, Savings)
- Recent transactions preview
- Savings goals preview
- Quick stats section
- Navigation to detailed pages

### Transactions
- Transaction list with search and filtering
- Filter by type (INCOME/EXPENSE)
- Filter by category
- Date range filtering
- Add transaction dialog
- Loading and error states
- Empty state handling

### Budgets
- Budget cards with progress visualization
- Budget vs actual spending
- Status indicators (on track, warning, over budget)
- Total budget statistics
- Current month budgets display

### Goals
- Savings goals with progress tracking
- Goal contribution functionality
- Progress percentage calculation
- Deadline display
- Total savings statistics

### Reports
- Monthly financial summary
- Income vs Expenses chart (BarChart)
- Expenses by category chart (PieChart)
- Budget vs Actual chart (BarChart)
- Savings growth chart (LineChart)
- Category analysis table
- Month/year selector for historical data

### UI/UX Features
- Dark/Light mode toggle
- Responsive design (mobile-friendly)
- Loading skeletons for better perceived performance
- Empty states with call-to-action
- Professional glassmorphism design on auth pages
- Smooth transitions and hover effects
- Consistent styling with TailwindCSS

## API Integration

The frontend is connected to the backend at `http://localhost:8080` with the following endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/{id}` - Get transaction by ID
- `GET /api/transactions/type/{type}` - Get transactions by type
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Budgets
- `GET /api/budgets` - Get all budgets
- `GET /api/budgets/current` - Get current month budgets
- `GET /api/budgets/month/{month}/year/{year}` - Get budgets by month/year
- `POST /api/budgets` - Create budget
- `PUT /api/budgets/{id}` - Update budget
- `DELETE /api/budgets/{id}` - Delete budget

### Goals
- `GET /api/goals` - Get all goals
- `GET /api/goals/{id}` - Get goal by ID
- `POST /api/goals` - Create goal
- `PUT /api/goals/{id}` - Update goal
- `POST /api/goals/{id}/contribute` - Contribute to goal
- `DELETE /api/goals/{id}` - Delete goal

### Reports
- `GET /api/reports/monthly` - Get monthly financial report
- `GET /api/reports/categories` - Get category report

## Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Configuration

### TailwindCSS
- Configured with custom theme variables for shadcn/ui
- Dark mode support via `next-themes`
- Custom color scheme with CSS variables

### API Configuration
- Base URL: `http://localhost:8080`
- Automatic token injection via interceptors
- Automatic redirect to login on 401 errors

## Routing

The application uses React Router with the following routes:

- `/auth/login` - Login page (public)
- `/auth/register` - Registration page (public)
- `/` - Dashboard (protected)
- `/dashboard` - Dashboard (protected)
- `/transactions` - Transactions management (protected)
- `/budgets` - Budgets management (protected)
- `/goals` - Savings goals (protected)
- `/reports` - Financial reports (protected)

Protected routes automatically redirect to `/auth/login` if user is not authenticated.

## Notes

- The backend must be running on `http://localhost:8080` for the application to function properly
- Without database data, pages will show empty states or loading errors
- Mock data was used during development and has been replaced with real API calls
- All components use named imports for shadcn/ui components (e.g., `import { Button } from...`)
- The application uses `pnpm` as the package manager

## Future Enhancements

- Add real-time data updates
- Implement data caching
- Add more chart types and visualizations
- Implement advanced filtering and sorting
- Add export functionality for reports
- Implement data persistence with offline support
