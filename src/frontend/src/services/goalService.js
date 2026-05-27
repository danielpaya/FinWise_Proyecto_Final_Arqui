import api from './api'

export const goalService = {
  async getAllGoals() {
    const response = await api.get('/api/goals')
    return response.data
  },

  async getGoalsByUser(userId) {
    const response = await api.get(`/api/goals/user/${userId}`)
    return response.data
  },

  async getGoalById(id) {
    const response = await api.get(`/api/goals/${id}`)
    return response.data
  },

  async createGoal(goalData) {
    const response = await api.post('/api/goals', goalData)
    return response.data
  },

  async createGoalByUser(userId, goalData) {
    const response = await api.post(`/api/goals/user/${userId}`, goalData)
    return response.data
  },

  async updateGoal(id, goalData) {
    const response = await api.put(`/api/goals/${id}`, goalData)
    return response.data
  },

  async deleteGoal(id) {
    const response = await api.delete(`/api/goals/${id}`)
    return response.data
  },

  async contributeToGoal(id, amount) {
    const response = await api.post(`/api/goals/${id}/contribute`, null, {
      params: { amount },
    })
    return response.data
  },
}