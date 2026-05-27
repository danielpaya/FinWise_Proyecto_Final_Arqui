import React from 'react'
import { render, screen } from '@testing-library/react'
import { AuthProvider } from '../context/AuthContext'
import AppRouter from './AppRouter'

describe('AppRouter protected routes', () => {
  beforeEach(() => {
    localStorage.clear()
    window.history.pushState({}, 'Test page', '/')
  })

  it('redirects unauthenticated user to login page when accessing protected route', async () => {
    render(
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    )

    expect(await screen.findByText(/welcome back/i)).toBeInTheDocument()
    expect(window.location.pathname).toBe('/auth/login')
  })

  it('allows authenticated user to access dashboard route', async () => {
    localStorage.setItem('token', 'fake-token')
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }))
    window.history.pushState({}, 'Test page', '/dashboard')

    render(
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    )

    expect(await screen.findByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByText(/overview of your financial health/i)).toBeInTheDocument()
  })
})
