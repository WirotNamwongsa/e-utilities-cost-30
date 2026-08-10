import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref([])
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  })

  async function fetchExpenses(params = {}) {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/expenses', { params })
      expenses.value = response.data.data
      pagination.value = response.data.pagination
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to fetch expenses'
    } finally {
      loading.value = false
    }
  }

  async function getExpense(id) {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/expenses/${id}`)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to fetch expense'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createExpense(expenseData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/expenses', expenseData)
      await fetchExpenses()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to create expense'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateExpense(id, expenseData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.put(`/expenses/${id}`, expenseData)
      await fetchExpenses()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to update expense'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteExpense(id) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/expenses/${id}`)
      await fetchExpenses()
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to delete expense'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    expenses,
    loading,
    error,
    pagination,
    fetchExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense
  }
})
