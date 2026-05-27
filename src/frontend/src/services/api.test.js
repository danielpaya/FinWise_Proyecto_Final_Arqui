import { describe, it, expect } from 'vitest'
import { getApiErrorDetails } from './api'

describe('getApiErrorDetails', () => {
  it('returns the error message and no field errors for a network error', () => {
    const error = { message: 'Network Error' }
    const details = getApiErrorDetails(error)

    expect(details).toEqual({
      message: 'Network Error',
      errors: {},
    })
  })

  it('extracts validation errors from ApiResponse.data', () => {
    const error = {
      response: {
        data: {
          success: false,
          message: 'Validation failed',
          data: {
            email: 'Email is required',
            password: 'Password must be at least 8 characters',
          },
        },
      },
    }

    const details = getApiErrorDetails(error)

    expect(details).toEqual({
      message: 'Validation failed',
      errors: {
        email: 'Email is required',
        password: 'Password must be at least 8 characters',
      },
    })
  })
})
