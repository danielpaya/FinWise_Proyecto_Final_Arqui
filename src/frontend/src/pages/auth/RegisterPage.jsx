import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'
import AuthCard from '../../components/auth/AuthCard'
import RegisterForm from '../../components/auth/RegisterForm'

function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleRegister = async (formData) => {
    try {
      setError('')
      const response = await authService.register(formData.name, formData.email, formData.password)
      
      if (response.success && response.data) {
        login(response.data.user, response.data.token)
        navigate('/dashboard')
      } else {
        setError(response.message || 'Registration failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-4">
            <span className="text-2xl font-bold text-primary-foreground">FW</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
          <p className="mt-2 text-muted-foreground">
            Start your financial journey with FinWise AI
          </p>
        </div>

        {/* Register Form */}
        <AuthCard>
          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}
          <RegisterForm onSubmit={handleRegister} />
        </AuthCard>

        {/* Login Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
