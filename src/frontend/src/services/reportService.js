import api from './api'

export const reportService = {
  async getDashboard(userId) {
    const response = await api.get(`/api/reports/dashboard/${userId}`)
    return response.data
  },

  async getMonthlyReportByUser(userId, month, year) {
    const response = await api.get(`/api/reports/monthly/${userId}`, {
      params: { month, year },
    })
    return response.data
  },

  async getCategoryReportByUser(userId, categoryType = 'EXPENSE', month, year) {
    const response = await api.get(`/api/reports/categories/${userId}`, {
      params: { categoryType, month, year },
    })
    return response.data
  },

  async getMonthlyReport(month, year) {
    const response = await api.get('/api/reports/monthly', {
      params: { month, year },
    })
    return response.data
  },

  async getCategoryReport(categoryType = 'EXPENSE') {
    const response = await api.get('/api/reports/categories', {
      params: { categoryType },
    })
    return response.data
  },
}