<template>
  <!-- Mobile overlay -->
  <div 
    v-if="mobileMenuOpen"
    @click="closeMobileMenu"
    class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
  ></div>

  <aside 
    class="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen fixed left-0 top-16 shadow-2xl border-r border-white/10 z-50 transition-transform duration-300 w-72 sm:w-64 max-h-screen overflow-y-auto"
    :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <nav class="p-4 sm:p-6">
      <div class="mb-6">
        <h2 class="text-[11px] sm:text-xs font-bold text-white/50 uppercase tracking-wider mb-3 sm:mb-4">เมนูหลัก</h2>
        <ul class="space-y-2 sm:space-y-3">
          <li>
            <router-link
              to="/"
              @click="closeMobileMenu"
              class="flex items-start px-3 sm:px-4 py-3 rounded-xl transition-all duration-300 group hover:scale-[1.01]"
              :class="$route.path === '/' ? 'bg-gradient-primary shadow-lg shadow-primary-500/30' : 'hover:bg-white/10'"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 mt-0.5 shrink-0 transition-transform group-hover:scale-110"
                   :class="$route.path === '/' ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <span class="font-medium leading-snug break-words">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/expenses"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-3 rounded-xl transition-all duration-300 group hover:scale-105"
              :class="$route.path.startsWith('/expenses') ? 'bg-gradient-secondary shadow-lg shadow-accent-500/30' : 'hover:bg-white/10'"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-transform group-hover:scale-110"
                   :class="$route.path.startsWith('/expenses') ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <span class="font-medium leading-snug break-words">รายการค่าใช้จ่าย</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div v-if="authStore.isAdmin" class="mb-6">
        <h2 class="text-[11px] sm:text-xs font-bold text-white/50 uppercase tracking-wider mb-3 sm:mb-4">จัดการ (Admin)</h2>
        <ul class="space-y-2 sm:space-y-3">
          <li>
            <router-link
              to="/settings/expense-categories"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-3 rounded-xl transition-all duration-300 group hover:scale-105"
              :class="$route.path.includes('expense-categories') ? 'bg-gradient-accent shadow-lg shadow-cyan-500/30' : 'hover:bg-white/10'"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-transform group-hover:scale-110"
                   :class="$route.path.includes('expense-categories') ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <span class="font-medium leading-snug break-words">จัดการประเภทค่าใช้จ่าย</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/settings/budget-categories"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-3 rounded-xl transition-all duration-300 group hover:scale-105"
              :class="$route.path.includes('budget-categories') ? 'bg-gradient-warm shadow-lg shadow-orange-500/30' : 'hover:bg-white/10'"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-transform group-hover:scale-110"
                   :class="$route.path.includes('budget-categories') ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span class="font-medium leading-snug break-words">จัดการหมวดเงินงบประมาณ</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="text-[11px] sm:text-xs font-bold text-white/50 uppercase tracking-wider mb-3 sm:mb-4">รายงาน</h2>
        <ul class="space-y-2 sm:space-y-3">
          <li>
            <router-link
              to="/reports"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-3 rounded-xl transition-all duration-300 group hover:scale-105"
              :class="$route.path === '/reports' ? 'bg-gradient-to-r from-vibrant-pink to-vibrant-purple shadow-lg shadow-pink-500/30' : 'hover:bg-white/10'"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-transform group-hover:scale-110"
                   :class="$route.path === '/reports' ? 'bg-white/20' : 'bg-white/10 group-hover:bg-white/20'">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <span class="font-medium leading-snug break-words">รายงานย้อนหลัง</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Expose function to parent
defineExpose({
  toggleMobileMenu,
  closeMobileMenu
})
</script>
