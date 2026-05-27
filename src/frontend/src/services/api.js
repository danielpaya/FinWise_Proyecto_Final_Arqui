import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const getApiErrorDetails = (error) => {
  const details = {
    message: error.message || 'Unknown error',
    errors: {},
  }

  const response = error.response?.data
  if (response) {
    if (response.message) details.message = response.message
    if (response.error) details.message = response.error

    if (typeof response.errors === 'object' && response.errors !== null) {
      details.errors = response.errors
    } else if (Array.isArray(response.errors) && response.errors.length > 0) {
      details.errors = response.errors.reduce((acc, item) => {
        if (item.field && item.message) {
          acc[item.field] = item.message
        }
        return acc
      }, {})
    } else if (typeof response.data === 'object' && response.data !== null) {
      details.errors = response.data
    }
  }

  return details
}

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/auth/login'
    }

    return Promise.reject({
      ...error,
      apiError: getApiErrorDetails(error),
    })
  }
)

export default api
