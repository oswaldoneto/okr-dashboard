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
            <div v-else class="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              Não há dados históricos disponíveis para este KR
            </div>
          </div>
        </div>

        <!-- Explicação do KR -->
        <div v-if="keyResultExplanation" class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Detalhes do Key Result</h2>
          </div>
          
          <div class="p-6 space-y-6">
            <!-- Medição -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                <DocumentChartBarIcon class="h-5 w-5 mr-2 text-blue-500" />
                Como é medido
              </h3>
              <div class="space-y-4">
                <!-- Descrição -->
                <div v-if="keyResultExplanation.measurement.descricao" class="mt-2">
                  <p class="text-gray-700 dark:text-gray-300">
                    {{ keyResultExplanation.measurement.descricao }}
                  </p>
                </div>

                <!-- Como é mensurado (para KRs mais complexos) -->
                <div v-if="keyResultExplanation.measurement.como_e_mensurado_calculado" class="mt-4">
                  <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Método de cálculo:</h4>
                  <ul class="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                    <li v-for="(item, index) in keyResultExplanation.measurement.como_e_mensurado_calculado" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>

                <!-- Fórmula -->
                <div v-if="keyResultExplanation.measurement.formula" class="mt-4">
                  <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Fórmula:</h4>
                  <div class="bg-gray-100 dark:bg-gray-800 rounded p-3 font-mono text-sm text-gray-800 dark:text-gray-300">
                    {{ keyResultExplanation.measurement.formula }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Fonte da Informação -->
            <div class="flex items-start gap-6">
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex-1">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <ServerIcon class="h-5 w-5 mr-2 text-green-500" />
                  Fonte da Informação
                </h3>
                <p class="text-gray-700 dark:text-gray-300">
                  {{ keyResultExplanation.fonte_da_informacao }}
                </p>
              </div>

              <!-- Frequência de Atualização -->
              <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex-1">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                  <ClockIcon class="h-5 w-5 mr-2 text-purple-500" />
                  Frequência de Atualização
                </h3>
                <p class="text-gray-700 dark:text-gray-300">
                  {{ keyResultExplanation.frequencia_de_atualizacao }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 text-center text-gray-500 dark:text-gray-400">
          Não há informações detalhadas disponíveis para este Key Result
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockOkrs } from '../data/okrs'
import { mockKeyResultHistory } from '../data/key-result-history'
import { mockKeyResultsExplaned } from '../data/all_key_results_explaned'
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
import {
  ClockIcon,
  DocumentChartBarIcon,
  ServerIcon
} from '@heroicons/vue/24/outline'

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
const keyResultHistory = ref({})
const keyResultsExplaned = ref([])

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

const keyResultExplanation = computed(() => {
  if (!keyResult.value) return null
  return keyResultsExplaned.value.find(
    kre => kre.keyResultId === keyResult.value.id && kre.objectiveId === keyResult.value.objectiveId
  )
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

onMounted(() => {
  objectives.value = mockOkrs
  keyResultHistory.value = mockKeyResultHistory
  keyResultsExplaned.value = mockKeyResultsExplaned
})
</script> 