import api from './api'

export const budgetService = {
  async getAllBudgets() {
    const response = await api.get('/api/budgets')
    return response.data
  },

  async getCurrentMonthBudgets() {
    const response = await api.get('/api/budgets/current')
    return response.data
  },

  async getBudgetsByMonth(month, year) {
    const response = await api.get(`/api/budgets/month/${month}/year/${year}`)
    return response.data
  },

  async getBudgetById(id) {
    const response = await api.get(`/api/budgets/${id}`)
    return response.data
  },

  async createBudget(budgetData) {
    const response = await api.post('/api/budgets', budgetData)
    return response.data
  },

  async updateBudget(id, budgetData) {
    const response = await api.put(`/api/budgets/${id}`, budgetData)
    return response.data
  },

  async deleteBudget(id) {
    const response = await api.delete(`/api/budgets/${id}`)
    return response.data
  },
}
