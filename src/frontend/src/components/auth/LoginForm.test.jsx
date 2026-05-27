import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows validation errors when form is submitted empty', async () => {
    render(<LoginForm onSubmit={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it('shows server-side field errors from props', () => {
    const serverErrors = {
      email: 'Email not found',
      password: 'Invalid password',
    }

    render(<LoginForm onSubmit={vi.fn()} serverErrors={serverErrors} />)

    expect(screen.getByText(serverErrors.email)).toBeInTheDocument()
    expect(screen.getByText(serverErrors.password)).toBeInTheDocument()
  })

  it('calls onFieldChange when a field is edited', async () => {
    const onFieldChange = vi.fn()
    render(<LoginForm onSubmit={vi.fn()} onFieldChange={onFieldChange} />)

    await userEvent.type(screen.getByLabelText(/email/i), 'a')

    expect(onFieldChange).toHaveBeenCalledWith('email')
  })
})
