<template>
  <div class="h-64">
    <Bar
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const colors = [
  'rgba(59, 130, 246, 0.8)',
  'rgba(16, 185, 129, 0.8)',
  'rgba(245, 158, 11, 0.8)',
  'rgba(239, 68, 68, 0.8)',
  'rgba(139, 92, 246, 0.8)',
  'rgba(236, 72, 153, 0.8)',
  'rgba(107, 114, 128, 0.8)'
]

const chartData = computed(() => ({
  labels: props.data.map(item => item.category?.name || 'Unknown'),
  datasets: [
    {
      label: 'ยอดเงิน (บาท)',
      data: props.data.map(item => item.total),
      backgroundColor: colors.slice(0, props.data.length),
      borderColor: colors.slice(0, props.data.length).map(c => c.replace('0.8', '1')),
      borderWidth: 1
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return value.toLocaleString('th-TH')
        }
      }
    }
  }
}
</script>
