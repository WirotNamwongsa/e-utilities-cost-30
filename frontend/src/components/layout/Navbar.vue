<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-primary-600">
            ระบบติดตามค่าสาธารณูปโภค
          </h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">{{ authStore.user?.full_name }}</span>
          <button
            @click="handleLogout"
            class="btn btn-secondary text-sm"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>
