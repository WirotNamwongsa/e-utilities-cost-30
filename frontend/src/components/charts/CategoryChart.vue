<template>
  <div class="h-64">
    <Doughnut
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

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
      position: 'right'
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const value = context.raw
          return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB'
          }).format(value)
        }
      }
    }
  }
}
</script>
