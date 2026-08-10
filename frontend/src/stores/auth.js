import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(localStorage.getItem('accessToken'))
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(credentials) {
    loading.value = true
    error.value = null
    try {
      const response = await authService.login(credentials)
      user.value = response.user
      accessToken.value = response.accessToken
      localStorage.setItem('accessToken', response.accessToken)
      return true
    } catch (err) {
      error.value = err.response?.data?.error?.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      accessToken.value = null
      localStorage.removeItem('accessToken')
      loading.value = false
    }
  }

  async function checkAuth() {
    if (!accessToken.value) return false

    loading.value = true
    try {
      const userData = await authService.getMe()
      user.value = userData
      return true
    } catch (err) {
      console.error('Auth check failed:', err)
      user.value = null
      accessToken.value = null
      localStorage.removeItem('accessToken')
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    accessToken,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    checkAuth
  }
})
