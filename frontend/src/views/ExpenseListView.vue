<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
    <Navbar @toggle-mobile-menu="handleMobileMenuToggle" />
    <Sidebar ref="sidebarRef" />
    <main class="lg:ml-64 pt-16 p-4 sm:p-6 transition-all duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
          <h1 class="text-2xl sm:text-3xl font-bold gradient-text">รายการค่าใช้จ่าย</h1>
          <router-link to="/expenses/create" class="btn btn-primary w-full sm:w-auto">
            + เพิ่มรายการใหม่
          </router-link>
        </div>

        <!-- Filters -->
        <div class="card-gradient mb-4 sm:mb-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="label">เดือน</label>
              <select v-model="filters.month" class="input" @change="applyFilters">
                <option value="">ทั้งหมด</option>
                <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
              </select>
            </div>
            <div>
              <label class="label">ปี</label>
              <select v-model="filters.year" class="input" @change="applyFilters">
                <option value="">ทั้งหมด</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
            <div>
              <label class="label">ประเภทค่าใช้จ่าย</label>
              <select v-model="filters.expense_category_id" class="input" @change="applyFilters">
                <option value="">ทั้งหมด</option>
                <option
                  v-for="cat in categoryStore.expenseCategories"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="label">หมวดเงินงบประมาณ</label>
              <select v-model="filters.budget_category_id" class="input" @change="applyFilters">
                <option value="">ทั้งหมด</option>
                <option
                  v-for="cat in categoryStore.budgetCategories"
                  :key="cat.id"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Expenses Table -->
        <div class="card-gradient overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  เดือนบิล
                </th>
                <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ประเภท
                </th>
                <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  หมวดเงิน
                </th>
                <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จำนวนเงิน
                </th>
                <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  วันที่ชำระ
                </th>
                <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  ผู้บันทึก
                </th>
                <th class="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="expenseStore.loading">
                <td colspan="7" class="px-4 sm:px-6 py-4 text-center text-gray-500">
                  กำลังโหลด...
                </td>
              </tr>
              <tr v-else-if="expenseStore.expenses.length === 0">
                <td colspan="7" class="px-4 sm:px-6 py-4 text-center text-gray-500">
                  ไม่พบรายการ
                </td>
              </tr>
              <tr v-else v-for="expense in expenseStore.expenses" :key="expense.id">
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(expense.billing_month) }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ expense.expense_category?.name }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                  {{ expense.budget_category?.name }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ formatCurrency(expense.amount) }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {{ expense.paid_date ? formatDate(expense.paid_date) : '-' }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                  {{ expense.creator?.full_name }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <router-link :to="`/expenses/${expense.id}/edit`" class="btn btn-secondary px-3 py-1 text-sm inline-flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-primary-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/></svg>
                      <span>แก้ไข</span>
                    </router-link>

                    <button @click="handleDelete(expense.id)" class="btn btn-danger px-3 py-1 text-sm inline-flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h14a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm2 6a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd"/></svg>
                      <span>ลบ</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Pagination -->
          <div v-if="expenseStore.pagination.totalPages > 1" class="flex flex-col sm:flex-row justify-between items-center mt-4 px-4 sm:px-6 gap-4">
            <button
              @click="changePage(expenseStore.pagination.page - 1)"
              :disabled="expenseStore.pagination.page === 1"
              class="btn btn-secondary w-full sm:w-auto"
              :class="{ 'opacity-50 cursor-not-allowed': expenseStore.pagination.page === 1 }"
            >
              ก่อนหน้า
            </button>
            <span class="text-sm text-gray-600">
              หน้า {{ expenseStore.pagination.page }} จาก {{ expenseStore.pagination.totalPages }}
            </span>
            <button
              @click="changePage(expenseStore.pagination.page + 1)"
              :disabled="expenseStore.pagination.page === expenseStore.pagination.totalPages"
              class="btn btn-secondary w-full sm:w-auto"
              :class="{ 'opacity-50 cursor-not-allowed': expenseStore.pagination.page === expenseStore.pagination.totalPages }"
            >
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useExpenseStore } from '@/stores/expense'
import { useCategoryStore } from '@/stores/category'

const router = useRouter()
const expenseStore = useExpenseStore()
const categoryStore = useCategoryStore()
const sidebarRef = ref(null)

function handleMobileMenuToggle(isOpen) {
  if (sidebarRef.value) {
    if (isOpen) {
      sidebarRef.value.toggleMobileMenu()
    } else {
      sidebarRef.value.closeMobileMenu()
    }
  }
}

const filters = ref({
  month: '',
  year: '',
  expense_category_id: '',
  budget_category_id: ''
})

const currentYear = new Date().getFullYear()
const years = computed(() => {
  const years = []
  for (let i = currentYear - 5; i <= currentYear + 1; i++) {
    years.push(i)
  }
  return years
})

function formatCurrency(amount) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  }).format(amount)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

async function applyFilters() {
  await expenseStore.fetchExpenses({
    ...filters.value,
    page: 1
  })
}

async function changePage(page) {
  await expenseStore.fetchExpenses({
    ...filters.value,
    page
  })
}

async function handleDelete(id) {
  if (confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
    try {
      await expenseStore.deleteExpense(id)
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการลบรายการ')
    }
  }
}

onMounted(async () => {
  await Promise.all([
    categoryStore.fetchExpenseCategories(),
    categoryStore.fetchBudgetCategories(),
    expenseStore.fetchExpenses()
  ])
})
</script>
