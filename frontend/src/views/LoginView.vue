<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full">
      <div class="card">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            ระบบติดตามค่าสาธารณูปโภค
          </h1>
          <p class="text-gray-600">เข้าสู่ระบบเพื่อจัดการค่าใช้จ่าย</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="label">ชื่อผู้ใช้</label>
            <input
              v-model="username"
              type="text"
              class="input"
              placeholder="ชื่อผู้ใช้"
              required
            />
          </div>

          <div>
            <label class="label">รหัสผ่าน</label>
            <input
              v-model="password"
              type="password"
              class="input"
              placeholder="รหัสผ่าน"
              required
            />
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {{ error }}
          </div>

          <button
            type="submit"
            class="w-full btn btn-primary"
            :disabled="loading"
          >
            {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
          </button>
        </form>

        <div class="mt-6 text-center text-sm text-gray-600">
          <p>เข้าสู่ระบบด้วย:</p>
          <p class="font-medium">ชื่อผู้ใช้: admin | รหัสผ่าน: admin123</p>
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
