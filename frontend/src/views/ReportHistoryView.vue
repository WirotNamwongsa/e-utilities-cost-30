<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar v-model="isMobileMenuOpen" @toggle-mobile-menu="handleMobileMenuToggle" />
    <Sidebar ref="sidebarRef" />
    <main class="lg:ml-64 pt-16 p-4 sm:p-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">รายงานย้อนหลัง</h1>

        <!-- Year Comparison -->
        <div class="card mb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">เปรียบเทียบระหว่างปี</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <div>
              <label class="label">ปีที่ 1</label>
              <select v-model="comparison.year1" class="input" @change="fetchComparison">
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
            <div>
              <label class="label">ปีที่ 2</label>
              <select v-model="comparison.year2" class="input" @change="fetchComparison">
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
            <div class="flex items-end">
              <button @click="fetchComparison" class="btn btn-primary w-full lg:w-auto">
                เปรียบเทียบ
              </button>
            </div>
          </div>

          <div v-if="comparisonData" class="mt-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-600 mb-1">ปี {{ comparisonData.year1.year }}</h3>
                <p class="text-2xl font-bold text-blue-600">
                  {{ formatCurrency(comparisonData.year1.total) }}
                </p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-600 mb-1">ปี {{ comparisonData.year2.year }}</h3>
                <p class="text-2xl font-bold text-green-600">
                  {{ formatCurrency(comparisonData.year2.total) }}
                </p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-600 mb-1">เปลี่ยนแปลง</h3>
                <p
                  class="text-2xl font-bold"
                  :class="comparisonData.percentageChange >= 0 ? 'text-red-600' : 'text-green-600'"
                >
                  {{ comparisonData.percentageChange >= 0 ? '+' : '' }}{{ comparisonData.percentageChange }}%
                </p>
              </div>
            </div>

            <ComparisonChart :data="comparisonData" />
          </div>
        </div>

        <!-- Historical Summary by Year -->
        <div class="card">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">สรุปยอดรายปี</h2>
          <div class="mb-4 max-w-md">
            <label class="label">เลือกปี</label>
            <select v-model="selectedYear" class="input" @change="fetchYearData">
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>

          <div v-if="yearData" class="space-y-6">
            <div>
              <h3 class="text-md font-semibold text-gray-900 mb-3">แยกตามประเภทค่าใช้จ่าย</h3>
              <CategoryChart :data="yearData.categoryData" />
            </div>

            <div>
              <h3 class="text-md font-semibold text-gray-900 mb-3">แยกตามหมวดเงินงบประมาณ</h3>
              <BudgetChart :data="yearData.budgetData" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import ComparisonChart from '@/components/charts/ComparisonChart.vue'
import CategoryChart from '@/components/charts/CategoryChart.vue'
import BudgetChart from '@/components/charts/BudgetChart.vue'
import api from '@/services/api'

const sidebarRef = ref(null)
const isMobileMenuOpen = ref(false)
const currentYear = new Date().getFullYear()
const years = computed(() => {
  const yearList = []
  for (let i = currentYear - 5; i <= currentYear; i++) {
    yearList.push(i)
  }
  return yearList
})

const comparison = ref({
  year1: currentYear - 1,
  year2: currentYear - 2
})

const comparisonData = ref(null)
const selectedYear = ref(currentYear)
const yearData = ref(null)

function formatCurrency(amount) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(amount)
}

function handleMobileMenuToggle(isOpen) {
  isMobileMenuOpen.value = isOpen
  if (sidebarRef.value) {
    if (isOpen) {
      sidebarRef.value.toggleMobileMenu()
    } else {
      sidebarRef.value.closeMobileMenu()
    }
  }
}

watch(() => route.path, () => {
  isMobileMenuOpen.value = false
  if (sidebarRef.value) {
    sidebarRef.value.closeMobileMenu()
  }
})

async function fetchComparison() {
  try {
    const response = await api.get('/dashboard/compare', {
      params: {
        year1: comparison.value.year1,
        year2: comparison.value.year2
      }
    })
    comparisonData.value = response.data
  } catch (error) {
    console.error('Failed to fetch comparison data:', error)
  }
}

async function fetchYearData() {
  try {
    const [categoryRes, budgetRes] = await Promise.all([
      api.get('/dashboard/by-category', { params: { year: selectedYear.value } }),
      api.get('/dashboard/by-budget', { params: { year: selectedYear.value } })
    ])

    yearData.value = {
      categoryData: categoryRes.data.data,
      budgetData: budgetRes.data.data
    }
  } catch (error) {
    console.error('Failed to fetch year data:', error)
  }
}

onMounted(() => {
  fetchComparison()
  fetchYearData()
})
</script>
