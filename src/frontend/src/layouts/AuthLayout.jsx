import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">FinWise AI</h1>
          <p className="text-muted-foreground">Personal Finance Management</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
