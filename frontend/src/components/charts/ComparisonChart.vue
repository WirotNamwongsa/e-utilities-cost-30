<template>
  <div class="h-80">
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
    type: Object,
    default: () => ({})
  }
})

const chartData = computed(() => {
  // Get all unique months from both years
  const allMonths = new Set()
  props.data.year1?.monthlyData?.forEach(item => allMonths.add(item.month))
  props.data.year2?.monthlyData?.forEach(item => allMonths.add(item.month))

  const labels = Array.from(allMonths).sort()

  return {
    labels: labels.map(month => {
      const [year, m] = month.split('-')
      return `${m}/${year}`
    }),
    datasets: [
      {
        label: `ปี ${props.data.year1?.year}`,
        data: labels.map(month => {
          const item = props.data.year1?.monthlyData?.find(d => d.month === month)
          return item?.total || 0
        }),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      },
      {
        label: `ปี ${props.data.year2?.year}`,
        data: labels.map(month => {
          const item = props.data.year2?.monthlyData?.find(d => d.month === month)
          return item?.total || 0
        }),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
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
