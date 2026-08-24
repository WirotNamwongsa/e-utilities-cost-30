<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar v-model="isMobileMenuOpen" @toggle-mobile-menu="handleMobileMenuToggle" />
    <Sidebar ref="sidebarRef" />
    <main class="lg:ml-64 pt-16 p-4 sm:p-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          {{ isExpenseCategory ? 'จัดการประเภทค่าใช้จ่าย' : 'จัดการหมวดเงินงบประมาณ' }}
        </h1>

        <!-- Add New Category -->
        <div class="card mb-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">เพิ่ม{{ isExpenseCategory ? 'ประเภทค่าใช้จ่าย' : 'หมวดเงินงบประมาณ' }}ใหม่</h2>
          <form @submit.prevent="handleCreate" class="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <label class="label">ชื่อ *</label>
              <input
                v-model="newCategory.name"
                type="text"
                class="input"
                placeholder="ชื่อ"
                required
              />
            </div>
            <div>
              <label class="label">รหัส *</label>
              <input
                v-model="newCategory.code"
                type="text"
                class="input"
                placeholder="รหัส (เช่น ELEC, WATER)"
                required
              />
            </div>
            <div v-if="isExpenseCategory">
              <label class="label">หน่วย</label>
              <input
                v-model="newCategory.unit"
                type="text"
                class="input"
                placeholder="หน่วย (เช่น บาท)"
              />
            </div>
            <div class="xl:col-span-3">
              <button
                type="submit"
                class="btn btn-primary w-full sm:w-auto"
                :disabled="categoryStore.loading"
              >
                {{ categoryStore.loading ? 'กำลังบันทึก...' : 'เพิ่ม' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Categories List -->
        <div class="card">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            รายการ{{ isExpenseCategory ? 'ประเภทค่าใช้จ่าย' : 'หมวดเงินงบประมาณ' }}
          </h2>
          <div class="overflow-x-auto">
            <table class="min-w-[560px] w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ชื่อ
                </th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รหัส
                </th>
                <th v-if="isExpenseCategory" class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  หน่วย
                </th>
                <th class="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="categoryStore.loading">
                <td :colspan="isExpenseCategory ? 4 : 3" class="px-6 py-4 text-center text-gray-500">
                  กำลังโหลด...
                </td>
              </tr>
              <tr v-else-if="categories.length === 0">
                <td :colspan="isExpenseCategory ? 4 : 3" class="px-6 py-4 text-center text-gray-500">
                  ไม่พบรายการ
                </td>
              </tr>
              <tr v-else v-for="category in categories" :key="category.id">
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ category.name }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ category.code }}
                </td>
                <td v-if="isExpenseCategory" class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ category.unit || '-' }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="handleDelete(category.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useCategoryStore } from '@/stores/category'

const route = useRoute()
const categoryStore = useCategoryStore()
const sidebarRef = ref(null)
const isMobileMenuOpen = ref(false)

const isExpenseCategory = computed(() => route.path.includes('expense-categories'))
const categories = computed(() => 
  isExpenseCategory.value ? categoryStore.expenseCategories : categoryStore.budgetCategories
)

const newCategory = ref({
  name: '',
  code: '',
  unit: ''
})

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

async function handleCreate() {
  try {
    const payload = {
      name: String(newCategory.value.name || '').trim(),
      code: String(newCategory.value.code || '').trim().toUpperCase(),
      ...(isExpenseCategory.value ? { unit: String(newCategory.value.unit || '').trim() } : {})
    }

    if (isExpenseCategory.value) {
      await categoryStore.createExpenseCategory(payload)
    } else {
      await categoryStore.createBudgetCategory(payload)
    }
    newCategory.value = { name: '', code: '', unit: '' }
  } catch (error) {
    alert('เกิดข้อผิดพลาดในการเพิ่มรายการ')
  }
}

async function handleDelete(id) {
  if (confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
    try {
      if (isExpenseCategory.value) {
        await categoryStore.deleteExpenseCategory(id)
      } else {
        await categoryStore.deleteBudgetCategory(id)
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการลบรายการ')
    }
  }
}

onMounted(async () => {
  if (isExpenseCategory.value) {
    await categoryStore.fetchExpenseCategories()
  } else {
    await categoryStore.fetchBudgetCategories()
  }
})
</script>
