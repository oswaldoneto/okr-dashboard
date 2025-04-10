<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <main class="p-6">
      <!-- Cabeçalho -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Visão Geral dos OKRs</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Acompanhamento da saúde dos OKRs da área</p>
      </div>

      <!-- Grid de Objetivos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="objective in objectives" :key="objective.id" 
             class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <!-- Cabeçalho do Objetivo -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex justify-between items-start">
              <div>
                <router-link 
                  :to="{ name: 'objective', params: { id: objective.id }}"
                  class="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {{ objective.id }}
                </router-link>
                <h2 class="mt-1 text-gray-600 dark:text-gray-400">{{ objective.title }}</h2>
              </div>
              <div class="flex space-x-4 text-sm">
                <div class="text-center">
                  <span class="block text-gray-500 dark:text-gray-400">KRs</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ objective.key_results.length }}</span>
                </div>
                <div class="text-center">
                  <span class="block text-gray-500 dark:text-gray-400">Iniciativas</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ getInitiativesCount(objective.id) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Lista de KRs -->
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="kr in objective.key_results" :key="kr.id"
                   class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                   :class="kr.disabled ? 'opacity-75' : ''">
                <!-- Barra de Status -->
                <div :class="getHealthIndicatorColor(kr.progress, kr.disabled)" 
                     class="w-2 h-full absolute left-0 top-0 bottom-0 rounded-l-lg"></div>
                
                <div class="flex items-center space-x-4 ml-4 flex-grow">
                  <!-- Status Badge -->
                  <div :class="getHealthBadgeColor(kr.progress, kr.disabled)"
                       class="px-3 py-1 rounded-full text-sm font-medium">
                    {{ getStatusLabel(kr) }}
                  </div>
                  
                  <div class="flex-grow">
                    <router-link 
                      :to="{ name: 'key-result', params: { id: kr.id }}"
                      class="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {{ kr.id }}
                    </router-link>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{{ kr.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mockInitiatives } from '../data/initiatives'

const props = defineProps({
  objectives: {
    type: Array,
    required: true
  }
})

const getInitiativesCount = (objectiveId) => {
  return mockInitiatives.filter(initiative => initiative.objectiveId === objectiveId).length
}

const getHealthIndicatorColor = (progress, disabled) => {
  if (disabled) {
    return 'bg-gray-400 dark:bg-gray-500'
  }
  if (progress < 30) {
    return 'bg-red-500 dark:bg-red-600'
  } else if (progress < 70) {
    return 'bg-yellow-500 dark:bg-yellow-600'
  } else {
    return 'bg-green-500 dark:bg-green-600'
  }
}

const getHealthBadgeColor = (progress, disabled) => {
  if (disabled) {
    return 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
  }
  if (progress < 30) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  } else if (progress < 70) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  } else {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }
}

const getStatusLabel = (kr) => {
  if (kr.disabled) {
    return 'Desativado'
  }
  if (kr.progress < 30) {
    return 'Em Risco'
  } else if (kr.progress < 70) {
    return 'Atenção'
  } else {
    return 'No Prazo'
  }
}
</script>

<style scoped>
.flex {
  position: relative;
}
</style> 