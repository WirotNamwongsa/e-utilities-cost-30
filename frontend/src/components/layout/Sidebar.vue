<template>
  <aside class="bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-16">
    <nav class="p-4">
      <ul class="space-y-2">
        <li>
          <router-link
            to="/"
            class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            :class="{ 'bg-gray-700': $route.path === '/' }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            to="/expenses"
            class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            :class="{ 'bg-gray-700': $route.path.startsWith('/expenses') }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            รายการค่าใช้จ่าย
          </router-link>
        </li>
        <li v-if="authStore.isAdmin">
          <router-link
            to="/settings/expense-categories"
            class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            :class="{ 'bg-gray-700': $route.path.includes('expense-categories') }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
            </svg>
            จัดการประเภทค่าใช้จ่าย
          </router-link>
        </li>
        <li v-if="authStore.isAdmin">
          <router-link
            to="/settings/budget-categories"
            class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            :class="{ 'bg-gray-700': $route.path.includes('budget-categories') }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            จัดการหมวดเงินงบประมาณ
          </router-link>
        </li>
        <li>
          <router-link
            to="/reports"
            class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            :class="{ 'bg-gray-700': $route.path === '/reports' }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            รายงานย้อนหลัง
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
