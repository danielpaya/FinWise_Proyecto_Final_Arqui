import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from './RegisterForm'

describe('RegisterForm', () => {
  it('renders all input fields', () => {
    render(<RegisterForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('shows client-side validation errors for invalid register data', async () => {
    render(<RegisterForm onSubmit={vi.fn()} />)

    await userEvent.click(screen.getByRole('button', { name: /create account/i }))

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument()
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it('shows server-side validation messages passed through props', () => {
    const serverErrors = {
      name: 'Name already taken',
      email: 'Email already registered',
    }

    render(<RegisterForm onSubmit={vi.fn()} serverErrors={serverErrors} />)

    expect(screen.getByText(serverErrors.name)).toBeInTheDocument()
    expect(screen.getByText(serverErrors.email)).toBeInTheDocument()
  })

  it('calls onFieldChange when the name field changes', async () => {
    const onFieldChange = vi.fn()
    render(<RegisterForm onSubmit={vi.fn()} onFieldChange={onFieldChange} />)

    await userEvent.type(screen.getByLabelText(/full name/i), 'Jo')

    expect(onFieldChange).toHaveBeenCalledWith('name')
  })
})
