import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useCategoryStore = defineStore('category', () => {
  const expenseCategories = ref([])
  const budgetCategories = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchExpenseCategories() {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/expense-categories')
      expenseCategories.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to fetch expense categories'
    } finally {
      loading.value = false
    }
  }

  async function fetchBudgetCategories() {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/budget-categories')
      budgetCategories.value = response.data
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to fetch budget categories'
    } finally {
      loading.value = false
    }
  }

  async function createExpenseCategory(categoryData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/expense-categories', categoryData)
      await fetchExpenseCategories()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to create expense category'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateExpenseCategory(id, categoryData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.put(`/expense-categories/${id}`, categoryData)
      await fetchExpenseCategories()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to update expense category'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteExpenseCategory(id) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/expense-categories/${id}`)
      await fetchExpenseCategories()
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to delete expense category'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createBudgetCategory(categoryData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/budget-categories', categoryData)
      await fetchBudgetCategories()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to create budget category'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateBudgetCategory(id, categoryData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.put(`/budget-categories/${id}`, categoryData)
      await fetchBudgetCategories()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to update budget category'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteBudgetCategory(id) {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/budget-categories/${id}`)
      await fetchBudgetCategories()
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Failed to delete budget category'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    expenseCategories,
    budgetCategories,
    loading,
    error,
    fetchExpenseCategories,
    fetchBudgetCategories,
    createExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    createBudgetCategory,
    updateBudgetCategory,
    deleteBudgetCategory
  }
})
