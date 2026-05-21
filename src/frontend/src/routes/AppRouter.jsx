import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import DashboardLayout from "../layouts/DashboardLayout"
import DashboardPage from "../pages/dashboard/DashboardPage"
import TransactionsPage from "../pages/transactions/TransactionsPage"
import BudgetsPage from "../pages/budgets/BudgetsPage"
import GoalsPage from "../pages/goals/GoalsPage"
import ReportsPage from "../pages/reports/ReportsPage"
import LoginPage from "../pages/auth/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage"

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }
  
  if (!user) {
    return <Navigate to="/auth/login" replace />
  }
  
  return children
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="budgets" element={<BudgetsPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter