import api from './api'

export const authService = {
  async login(email, password) {
    const response = await api.post('/api/auth/login', { email, password })
    return response.data
  },

  async register(name, email, password) {
    const response = await api.post('/api/auth/register', { name, email, password })
    return response.data
  },

  async logout() {
    // For now, just clear local storage (handled in context)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}
