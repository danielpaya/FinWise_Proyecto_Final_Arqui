import api from './api'

export const reportService = {
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
