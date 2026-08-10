<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <Sidebar />
    <main class="ml-64 pt-16 p-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="card">
            <h3 class="text-sm font-medium text-gray-600 mb-2">เดือนปัจจุบัน</h3>
            <p class="text-2xl font-bold text-primary-600">
              {{ formatCurrency(summary.currentMonth?.total || 0) }}
            </p>
            <p class="text-sm text-gray-500 mt-1">
              {{ summary.currentMonth?.month }}/{{ summary.currentMonth?.year }}
            </p>
          </div>

          <div class="card">
            <h3 class="text-sm font-medium text-gray-600 mb-2">เดือนก่อนหน้า</h3>
            <p class="text-2xl font-bold text-gray-700">
              {{ formatCurrency(summary.previousMonth?.total || 0) }}
            </p>
            <p class="text-sm text-gray-500 mt-1">
              {{ summary.previousMonth?.month }}/{{ summary.previousMonth?.year }}
            </p>
          </div>

          <div class="card">
            <h3 class="text-sm font-medium text-gray-600 mb-2">สะสมปีนี้</h3>
            <p class="text-2xl font-bold text-green-600">
              {{ formatCurrency(summary.yearToDate?.total || 0) }}
            </p>
            <p class="text-sm text-gray-500 mt-1">
              ปี {{ summary.yearToDate?.year }}
            </p>
          </div>

          <div class="card">
            <h3 class="text-sm font-medium text-gray-600 mb-2">เปลี่ยนแปลง</h3>
            <p
              class="text-2xl font-bold"
              :class="summary.percentageChange >= 0 ? 'text-red-600' : 'text-green-600'"
            >
              {{ summary.percentageChange >= 0 ? '+' : '' }}{{ summary.percentageChange }}%
            </p>
            <p class="text-sm text-gray-500 mt-1">เทียบกับเดือนก่อนหน้า</p>
          </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">ยอดรายเดือน</h3>
            <MonthlyChart :data="summary.monthlyBreakdown" />
          </div>

          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">แยกตามประเภท</h3>
            <CategoryChart :data="categoryData" />
          </div>
        </div>

        <!-- Budget Breakdown -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">แยกตามหมวดเงินงบประมาณ</h3>
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

const summary = ref({
  currentMonth: { total: 0, month: 0, year: 0 },
  previousMonth: { total: 0, month: 0, year: 0 },
  yearToDate: { total: 0, year: 0 },
  percentageChange: 0,
  monthlyBreakdown: []
})

const categoryData = ref([])
const budgetData = ref([])

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
