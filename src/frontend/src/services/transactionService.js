import api from './api'

export const transactionService = {
  async getAllTransactions() {
    const response = await api.get('/api/transactions')
    return response.data
  },

  async getTransactionById(id) {
    const response = await api.get(`/api/transactions/${id}`)
    return response.data
  },

  async getTransactionsByType(type) {
    const response = await api.get(`/api/transactions/type/${type}`)
    return response.data
  },

  async createTransaction(transactionData) {
    const response = await api.post('/api/transactions', transactionData)
    return response.data
  },

  async updateTransaction(id, transactionData) {
    const response = await api.put(`/api/transactions/${id}`, transactionData)
    return response.data
  },

  async deleteTransaction(id) {
    const response = await api.delete(`/api/transactions/${id}`)
    return response.data
  },

  async getTransactionsByUser(userId) {
    const response = await api.get(`/api/transactions/user/${userId}`)
    return response.data
  },

  async createTransactionByUser(userId, transactionData) {
    const response = await api.post(`/api/transactions/user/${userId}`, transactionData)
    return response.data
  },
}
