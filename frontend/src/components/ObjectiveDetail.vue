<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Main Content -->
    <main class="p-6">
      <div class="mb-6">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {{ objective?.id }}
        </div>
        <div class="flex items-center gap-2">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ objective?.title }}</h1>
          <div class="relative group">
            <InformationCircleIcon 
              class="h-6 w-6 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help transition-colors duration-200" 
            />
            <!-- Tooltip -->
            <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-80 p-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {{ objective?.title }}
              <div class="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Results Section -->
      <section class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Key Results</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="kr in objective?.key_results" :key="kr.id" 
               class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow relative">
            <!-- Borda lateral colorida -->
            <div :class="getProgressColor(kr.progress, kr.disabled)" 
                 class="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"></div>
            
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-start gap-3">
                <div class="mt-1">
                  <component 
                    :is="getKrIcon(kr.id)" 
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  />
                </div>
                <div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {{ kr.id }}
                  </div>
                  <router-link 
                    :to="{ name: 'key-result', params: { id: kr.id }}"
                    class="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {{ kr.title }}
                  </router-link>
                </div>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ kr.dueDate }}</span>
            </div>

            <!-- Valor Monetário para MW-O-884 -->
            <div v-if="isMonetaryObjective" class="mt-4">
              <div class="flex justify-between items-baseline">
                <div class="text-3xl font-bold text-gray-900 dark:text-white">
                  {{ getKrValue(kr) }}
                </div>
              </div>
            </div>

            <!-- Barra de Progresso para outros objetivos -->
            <div v-else class="mt-4">
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      class="h-full transition-all duration-500 ease-out rounded-full"
                      :class="getProgressColor(kr.progress, kr.disabled)"
                      :style="{ width: `${kr.progress}%` }"
                    ></div>
                  </div>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {{ kr.progress }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Initiatives Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Iniciativas</h2>
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
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
                  Responsável
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
              <tr v-for="initiative in objectiveInitiatives" :key="initiative.id" 
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
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ initiative.responsible }}
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
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockOkrs } from '../data/okrs'
import { mockInitiatives } from '../data/initiatives'
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ServerIcon,
  CurrencyDollarIcon,
  DocumentChartBarIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const objectives = ref([])
const initiatives = ref([])

const objective = computed(() => {
  return objectives.value.find(obj => obj.id === route.params.id)
})

const objectiveInitiatives = computed(() => {
  return initiatives.value.filter(init => init.objectiveId === route.params.id)
})

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

const getProgressLabel = (kr) => {
  if (kr.disabled) {
    return 'Desativado'
  }

  switch (kr.id) {
    case 'MW-KR-898':
      return 'Uptime'
    case 'MW-KR-899':
      return 'Incidentes no SLA'
    case 'MW-KR-900':
      return 'Tempo médio de resposta'
    case 'MW-KR-965':
      return 'Primeira resposta no SLA'
    default:
      return 'Progresso'
  }
}

const getKrIcon = (krId) => {
  switch (krId) {
    // KRs de Performance e Estabilidade
    case 'MW-KR-898':
      return ServerIcon // Ícone de servidor para uptime
    case 'MW-KR-900':
      return ClockIcon // Ícone de relógio para tempo de resposta
    case 'MW-KR-965':
      return ExclamationCircleIcon // Ícone de alerta para primeira resposta
    case 'MW-KR-899':
      return CheckCircleIcon // Ícone de check para resolução de incidentes
    
    // KRs de Infraestrutura
    case 'MW-KR-885':
    case 'MW-KR-886':
    case 'MW-KR-887':
    case 'MW-KR-888':
      return CurrencyDollarIcon // Ícone de dinheiro para custos
    
    // KRs de Dados
    case 'MW-KR-957':
    case 'MW-KR-958':
      return DocumentChartBarIcon // Ícone de documento com gráfico para dados
    
    // KRs de Entregas
    case 'MW-KR-893':
    case 'MW-KR-894':
    case 'MW-KR-895':
    case 'MW-KR-896':
      return ClipboardDocumentCheckIcon // Ícone de checklist para entregas
    
    default:
      return ChartBarIcon // Ícone padrão de gráfico
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const isMonetaryObjective = computed(() => {
  return objective.value?.id === 'MW-O-884'
})

const getKrValue = (kr) => {
  if (!kr.currentValue) return '0'
  return formatCurrency(kr.currentValue)
}

const getKrTrend = (kr) => {
  if (!kr.previousValue || !kr.currentValue) return 0
  const difference = ((kr.currentValue - kr.previousValue) / kr.previousValue) * 100
  return difference.toFixed(1)
}

onMounted(() => {
  objectives.value = mockOkrs
  initiatives.value = mockInitiatives
})
</script> 