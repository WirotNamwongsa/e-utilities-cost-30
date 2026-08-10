<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
    <Navbar @toggle-mobile-menu="handleMobileMenuToggle" />
    <Sidebar ref="sidebarRef" />
    <main class="lg:ml-64 pt-16 p-4 sm:p-6 transition-all duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 sm:mb-8 animate-slide-down">
          <h1 class="text-2xl sm:text-3xl font-bold gradient-text text-shadow-lg mb-2">Dashboard</h1>
          <p class="text-gray-600 text-sm sm:text-base">ภาพรวมค่าสาธารณูปโภคของคุณ</p>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div class="card-gradient animate-card animate-card-delay-1 hover:glow group">
            <div class="flex items-center justify-between mb-3 sm:mb-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span class="text-xs font-semibold px-2 sm:px-3 py-1 bg-primary-100 text-primary-700 rounded-full">เดือนนี้</span>
            </div>
            <h3 class="text-xs sm:text-sm font-medium text-gray-600 mb-1">เดือนปัจจุบัน</h3>
            <p class="text-2xl sm:text-3xl font-bold gradient-text">
              {{ formatCurrency(summary.currentMonth?.total || 0) }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              {{ summary.currentMonth?.month }}/{{ summary.currentMonth?.year }}
            </p>
          </div>

          <div class="card-gradient animate-card animate-card-delay-2 hover:glow-purple group">
            <div class="flex items-center justify-between mb-3 sm:mb-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span class="text-xs font-semibold px-2 sm:px-3 py-1 bg-accent-100 text-accent-700 rounded-full">เดือนก่อน</span>
            </div>
            <h3 class="text-xs sm:text-sm font-medium text-gray-600 mb-1">เดือนก่อนหน้า</h3>
            <p class="text-2xl sm:text-3xl font-bold gradient-text-secondary">
              {{ formatCurrency(summary.previousMonth?.total || 0) }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              {{ summary.previousMonth?.month }}/{{ summary.previousMonth?.year }}
            </p>
          </div>

          <div class="card-gradient animate-card animate-card-delay-3 hover:glow group">
            <div class="flex items-center justify-between mb-3 sm:mb-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <span class="text-xs font-semibold px-2 sm:px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full">ปีนี้</span>
            </div>
            <h3 class="text-xs sm:text-sm font-medium text-gray-600 mb-1">สะสมปีนี้</h3>
            <p class="text-2xl sm:text-3xl font-bold text-cyan-600">
              {{ formatCurrency(summary.yearToDate?.total || 0) }}
            </p>
            <p class="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
              ปี {{ summary.yearToDate?.year }}
            </p>
          </div>

          <div class="card-gradient animate-card animate-card-delay-4 hover:glow-pink group">
            <div class="flex items-center justify-between mb-3 sm:mb-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-warm rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <span class="text-xs font-semibold px-2 sm:px-3 py-1 bg-orange-100 text-orange-700 rounded-full">เปลี่ยนแปลง</span>
            </div>
            <h3 class="text-xs sm:text-sm font-medium text-gray-600 mb-1">เปลี่ยนแปลง</h3>
            <p
              class="text-2xl sm:text-3xl font-bold"
              :class="summary.percentageChange >= 0 ? 'text-red-500' : 'text-green-500'"
            >
              {{ summary.percentageChange >= 0 ? '+' : '' }}{{ summary.percentageChange }}%
            </p>
            <p class="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">เทียบกับเดือนก่อนหน้า</p>
          </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div class="card-gradient animate-card hover:scale-[1.02] transition-transform">
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <h3 class="text-lg sm:text-xl font-bold gradient-text">ยอดรายเดือน</h3>
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <MonthlyChart :data="summary.monthlyBreakdown" />
          </div>

          <div class="card-gradient animate-card hover:scale-[1.02] transition-transform">
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <h3 class="text-lg sm:text-xl font-bold gradient-text-secondary">แยกตามประเภท</h3>
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
              </div>
            </div>
            <CategoryChart :data="categoryData" />
          </div>
        </div>

        <!-- Budget Breakdown -->
        <div class="card-gradient animate-card hover:scale-[1.02] transition-transform">
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h3 class="text-lg sm:text-xl font-bold text-cyan-600">แยกตามหมวดเงินงบประมาณ</h3>
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
              </svg>
            </div>
          </div>
          <BudgetChart :data="budgetData" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import MonthlyChart from '@/components/charts/MonthlyChart.vue'
import CategoryChart from '@/components/charts/CategoryChart.vue'
import BudgetChart from '@/components/charts/BudgetChart.vue'
import api from '@/services/api'

const sidebarRef = ref(null)

const summary = ref({
  currentMonth: { total: 0, month: 0, year: 0 },
  previousMonth: { total: 0, month: 0, year: 0 },
  yearToDate: { total: 0, year: 0 },
  percentageChange: 0,
  monthlyBreakdown: []
})

const categoryData = ref([])
const budgetData = ref([])

function handleMobileMenuToggle(isOpen) {
  if (sidebarRef.value) {
    if (isOpen) {
      sidebarRef.value.toggleMobileMenu()
    } else {
      sidebarRef.value.closeMobileMenu()
    }
  }
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(amount)
}

async function fetchDashboardData() {
  try {
    const [summaryRes, categoryRes, budgetRes] = await Promise.all([
      api.get('/dashboard/summary'),
      api.get('/dashboard/by-category'),
      api.get('/dashboard/by-budget')
    ])

    summary.value = summaryRes.data
    categoryData.value = categoryRes.data.data
    budgetData.value = budgetRes.data.data
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>
