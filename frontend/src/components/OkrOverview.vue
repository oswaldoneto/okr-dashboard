<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="max-w-7xl mx-auto">
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
                   class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center space-x-4">
                  <div :class="getHealthIndicatorColor(kr.progress)" 
                       class="w-3 h-3 rounded-full"></div>
                  <div>
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
    </div>
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

const getHealthIndicatorColor = (progress) => {
  if (progress < 30) {
    return 'bg-red-500 dark:bg-red-600'
  } else if (progress < 70) {
    return 'bg-yellow-500 dark:bg-yellow-600'
  } else {
    return 'bg-green-500 dark:bg-green-600'
  }
}
</script> 