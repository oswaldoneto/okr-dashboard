<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <main class="p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="flex justify-between items-start mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ keyResult?.title }}</h1>
            <p class="text-gray-500 dark:text-gray-400">{{ keyResult?.dueDate }}</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <span class="text-sm text-gray-500 dark:text-gray-400">Progresso Atual</span>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ keyResult?.progress }}%</div>
            </div>
            <div :class="getProgressColor(keyResult?.progress, keyResult?.disabled)" 
                 class="w-1 h-12 rounded-full"></div>
          </div>
        </div>

        <!-- Gráfico -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Histórico dos Últimos 6 Meses</h2>
          <div class="h-80">
            <LineChart
              v-if="chartData && chartData.datasets && chartData.datasets.length > 0"
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </div>

        <!-- Iniciativas Relacionadas -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Iniciativas Relacionadas</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Título
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Data de Vencimento
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="initiative in relatedInitiatives" :key="initiative.id" 
                    class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ initiative.title }}
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ initiative.description }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusColor(initiative.status)" 
                          class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ initiative.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {{ initiative.dueDate }}
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
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockOkrs } from '../data/okrs'
import { mockInitiatives } from '../data/initiatives'
import { mockKeyResultHistory } from '../data/key-result-history'
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const route = useRoute()
const objectives = ref([])
const initiatives = ref([])
const keyResultHistory = ref({})

const keyResult = computed(() => {
  for (const objective of objectives.value) {
    const kr = objective.key_results.find(kr => kr.id === route.params.id)
    if (kr) {
      return {
        ...kr,
        objectiveId: objective.id
      }
    }
  }
  return null
})

const chartData = computed(() => {
  if (!keyResult.value?.id || !keyResultHistory.value) {
    return {
      labels: [],
      datasets: []
    }
  }
  
  const history = keyResultHistory.value[keyResult.value.id] || []
  if (history.length === 0) {
    return {
      labels: [],
      datasets: []
    }
  }

  return {
    labels: history.map(item => item.month),
    datasets: [{
      label: 'Progresso',
      data: history.map(item => item.value),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(156, 163, 175, 0.1)'
      },
      ticks: {
        color: '#9CA3AF'
      }
    },
    x: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)'
      },
      ticks: {
        color: '#9CA3AF'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

const relatedInitiatives = computed(() => {
  if (!keyResult.value?.objectiveId) return []
  return initiatives.value.filter(init => init.objectiveId === keyResult.value.objectiveId)
})

const getProgressColor = (progress, disabled) => {
  if (disabled) {
    return 'bg-gray-400 dark:bg-gray-600'
  }
  
  if (progress < 30) {
    return 'bg-red-500 dark:bg-red-600'
  } else if (progress < 70) {
    return 'bg-yellow-500 dark:bg-yellow-600'
  } else {
    return 'bg-green-500 dark:bg-green-600'
  }
}

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'concluído':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'em andamento':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'em risco':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

onMounted(() => {
  objectives.value = mockOkrs
  initiatives.value = mockInitiatives
  keyResultHistory.value = mockKeyResultHistory
})
</script> 