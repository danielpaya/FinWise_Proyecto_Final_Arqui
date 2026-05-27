import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'
import AuthCard from '../../components/auth/AuthCard'
import LoginForm from '../../components/auth/LoginForm'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const clearFieldError = (field) => {
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleLogin = async (formData) => {
    try {
      setError('')
      setFieldErrors({})
      const response = await authService.login(formData.email, formData.password)
      
      if (response.success && response.data) {
        login(response.data.user, response.data.token)
        navigate('/dashboard')
      } else {
        setError(response.message || 'Login failed')
      }
    } catch (err) {
      const apiError = err.apiError || {}
      if (apiError.errors && Object.keys(apiError.errors).length > 0) {
        setFieldErrors(apiError.errors)
        setError(apiError.message || 'Please correct the highlighted fields.')
      } else {
        setError(apiError.message || err.response?.data?.message || 'Login failed. Please try again.')
      }
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
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your FinWise AI account
          </p>
        </div>

        {/* Login Form */}
        <AuthCard>
          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-destructive text-sm">
              {error}
            </div>
          )}
          <LoginForm
            onSubmit={handleLogin}
            serverErrors={fieldErrors}
            onFieldChange={clearFieldError}
          />
        </AuthCard>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-medium text-primary hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
