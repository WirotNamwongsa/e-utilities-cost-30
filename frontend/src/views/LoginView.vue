<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden p-4">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-primary rounded-full opacity-20 animate-float blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-secondary rounded-full opacity-20 animate-float blur-3xl" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-accent rounded-full opacity-10 animate-pulse-slow blur-3xl"></div>
    </div>

    <div class="max-w-md w-full relative z-10 animate-scale-in">
      <div class="card-gradient p-6 sm:p-8 md:p-10">
        <div class="text-center mb-6 sm:mb-8 animate-slide-down">
          <div class="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-primary rounded-2xl mb-3 sm:mb-4 shadow-lg glow animate-bounce-slow">
            <svg class="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold gradient-text mb-2 text-shadow-lg">
            ระบบติดตามค่าสาธารณูปโภค
          </h1>
          <p class="text-gray-600 font-medium text-sm sm:text-base">เข้าสู่ระบบเพื่อจัดการค่าใช้จ่าย</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-6">
          <div class="animate-slide-up" style="animation-delay: 0.1s;">
            <label class="label">ชื่อผู้ใช้</label>
            <div class="relative">
              <input
                v-model="username"
                type="text"
                class="input pl-12"
                placeholder="ชื่อผู้ใช้"
                required
              />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>

          <div class="animate-slide-up" style="animation-delay: 0.2s;">
            <label class="label">รหัสผ่าน</label>
            <div class="relative">
              <input
                v-model="password"
                type="password"
                class="input pl-12"
                placeholder="รหัสผ่าน"
                required
              />
              <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
          </div>

          <div v-if="error" class="animate-slide-up bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm" style="animation-delay: 0.3s;">
            <div class="flex items-center">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              {{ error }}
            </div>
          </div>

          <button
            type="submit"
            class="w-full btn btn-primary animate-slide-up"
            :disabled="loading"
            style="animation-delay: 0.4s;"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังเข้าสู่ระบบ...
            </span>
            <span v-else>เข้าสู่ระบบ</span>
          </button>
        </form>

        <div class="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600 animate-slide-up" style="animation-delay: 0.5s;">
          <div class="bg-white/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/30">
            <p class="font-medium text-gray-700 mb-1 sm:mb-2">เข้าสู่ระบบด้วย:</p>
            <div class="space-y-1 sm:space-y-2">
              <div class="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-2 space-y-1 sm:space-y-0">
                <span class="text-xs font-semibold px-2 py-1 bg-gradient-primary text-white rounded-full">Admin</span>
                <p class="gradient-text font-bold text-xs sm:text-sm">ชื่อผู้ใช้: admin | รหัสผ่าน: admin123</p>
              </div>
              <div class="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-2 space-y-1 sm:space-y-0">
                <span class="text-xs font-semibold px-2 py-1 bg-gradient-secondary text-white rounded-full">Staff</span>
                <p class="gradient-text-secondary font-bold text-xs sm:text-sm">ชื่อผู้ใช้: staff | รหัสผ่าน: staff123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

async function handleLogin() {
  loading.value = true
  error.value = null

  const success = await authStore.login({
    username: username.value,
    password: password.value
  })

  if (success) {
    router.push('/')
  } else {
    error.value = authStore.error
  }

  loading.value = false
}
</script>
