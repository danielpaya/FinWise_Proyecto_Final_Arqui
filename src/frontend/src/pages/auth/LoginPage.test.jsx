import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import LoginPage from './LoginPage'
import { authService } from '../../services/authService'

const navigateMock = vi.fn()

vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(),
  },
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('navigates to dashboard after successful login', async () => {
    authService.login.mockResolvedValueOnce({
      success: true,
      data: { user: { id: 1, name: 'Test User' }, token: 'fake-token' },
    })

    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    )

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/dashboard')
    })
    expect(localStorage.getItem('token')).toBe('fake-token')
    expect(localStorage.getItem('user')).toContain('Test User')
  })

  it('shows API validation errors on failed login', async () => {
    authService.login.mockRejectedValueOnce({
      apiError: {
        message: 'Invalid login credentials',
        errors: { email: 'Email is not registered' },
      },
    })

    render(
      <AuthProvider>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthProvider>
    )

    await userEvent.type(screen.getByLabelText(/email/i), 'bad@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'badpass123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/invalid login credentials/i)).toBeInTheDocument()
    expect(screen.getByText(/email is not registered/i)).toBeInTheDocument()
  })
})