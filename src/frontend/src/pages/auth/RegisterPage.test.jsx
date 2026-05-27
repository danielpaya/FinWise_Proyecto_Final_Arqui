import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import RegisterPage from './RegisterPage'
import { authService } from '../../services/authService'

const navigateMock = vi.fn()

vi.mock('../../services/authService', () => ({
  authService: {
    register: vi.fn(),
  },
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('navigates to dashboard after successful registration', async () => {
    authService.register.mockResolvedValueOnce({
      success: true,
      data: { user: { id: 2, name: 'New User' }, token: 'token-abc' },
    })

    render(
      <AuthProvider>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthProvider>
    )

    await userEvent.type(screen.getByLabelText(/full name/i), 'New User')
    await userEvent.type(screen.getByLabelText(/email/i), 'new@example.com')
    await userEvent.type(screen.getByLabelText(/^password$/i), 'newpassword123')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'newpassword123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/dashboard')
    })
    expect(localStorage.getItem('token')).toBe('token-abc')
  })

  it('shows API validation errors for registration failures', async () => {
    authService.register.mockRejectedValueOnce({
      apiError: {
        message: 'Registration error',
        errors: { email: 'Email is already taken' },
      },
    })

    render(
      <AuthProvider>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </AuthProvider>
    )

    await userEvent.type(screen.getByLabelText(/full name/i), 'New User')
    await userEvent.type(screen.getByLabelText(/email/i), 'exists@example.com')
    await userEvent.type(screen.getByLabelText(/^password$/i), 'newpassword123')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'newpassword123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))

    expect(await screen.findByText(/registration error/i)).toBeInTheDocument()
    expect(screen.getByText(/email is already taken/i)).toBeInTheDocument()
  })
})