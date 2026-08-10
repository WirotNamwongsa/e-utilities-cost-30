<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
    <Navbar @toggle-mobile-menu="handleMobileMenuToggle" />
    <Sidebar ref="sidebarRef" />
    <main class="lg:ml-64 pt-16 p-4 sm:p-6 transition-all duration-300">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">
          {{ isEdit ? 'แก้ไขรายการค่าใช้จ่าย' : 'เพิ่มรายการค่าใช้จ่ายใหม่' }}
        </h1>

        <div class="card-gradient">
          <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label class="label">ประเภทค่าใช้จ่าย *</label>
                <select v-model="form.expense_category_id" class="input" required>
                  <option value="">เลือกประเภท</option>
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
                <label class="label">หมวดเงินงบประมาณ *</label>
                <select v-model="form.budget_category_id" class="input" required>
                  <option value="">เลือกหมวดเงิน</option>
                  <option
                    v-for="cat in categoryStore.budgetCategories"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="label">จำนวนเงิน *</label>
                <input
                  v-model.number="form.amount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="input"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label class="label">เดือนบิล *</label>
                <input
                  v-model="form.billing_month"
                  type="month"
                  class="input"
                  required
                />
              </div>

              <div>
                <label class="label">วันที่ชำระ</label>
                <input
                  v-model="form.paid_date"
                  type="date"
                  class="input"
                />
              </div>

              <div>
                <label class="label">เลขที่ใบแจ้งหนี้</label>
                <input
                  v-model="form.invoice_no"
                  type="text"
                  class="input"
                  placeholder="เลขที่ใบแจ้งหนี้ (ถ้ามี)"
                />
              </div>
            </div>

            <div>
              <label class="label">หมายเหตุ</label>
              <textarea
                v-model="form.note"
                class="input"
                rows="3"
                placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
              ></textarea>
            </div>

            <div v-if="error" class="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {{ error }}
            </div>

            <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <router-link to="/expenses" class="btn btn-secondary w-full sm:w-auto">
                ยกเลิก
              </router-link>
              <button
                type="submit"
                class="btn btn-primary w-full sm:w-auto"
                :disabled="loading"
              >
                {{ loading ? 'กำลังบันทึก...' : (isEdit ? 'บันทึกการแก้ไข' : 'บันทึก') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useExpenseStore } from '@/stores/expense'
import { useCategoryStore } from '@/stores/category'

const router = useRouter()
const route = useRoute()
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

const isEdit = computed(() => !!route.params.id)
const loading = ref(false)
const error = ref(null)

const form = ref({
  expense_category_id: '',
  budget_category_id: '',
  amount: '',
  billing_month: '',
  paid_date: '',
  invoice_no: '',
  note: ''
})

async function handleSubmit() {
  loading.value = true
  error.value = null

  try {
    // Convert month to first day of month
    const [year, month] = form.value.billing_month.split('-')
    form.value.billing_month = `${year}-${month}-01`

    if (isEdit.value) {
      await expenseStore.updateExpense(route.params.id, form.value)
    } else {
      await expenseStore.createExpense(form.value)
    }
    router.push('/expenses')
  } catch (err) {
    error.value = expenseStore.error || 'เกิดข้อผิดพลาดในการบันทึก'
  } finally {
    loading.value = false
  }
}

async function loadExpense() {
  if (isEdit.value) {
    try {
      const expense = await expenseStore.getExpense(route.params.id)
      form.value = {
        expense_category_id: expense.expense_category_id,
        budget_category_id: expense.budget_category_id,
        amount: expense.amount,
        billing_month: expense.billing_month.substring(0, 7), // YYYY-MM
        paid_date: expense.paid_date || '',
        invoice_no: expense.invoice_no || '',
        note: expense.note || ''
      }
    } catch (err) {
      error.value = 'ไม่พบรายการที่ต้องการแก้ไข'
    }
  }
}

onMounted(async () => {
  await Promise.all([
    categoryStore.fetchExpenseCategories(),
    categoryStore.fetchBudgetCategories()
  ])
  await loadExpense()
})
</script>
