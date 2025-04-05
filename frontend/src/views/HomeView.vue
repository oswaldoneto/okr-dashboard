<template>
  <div class="home">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 dark:text-white">OKR Dashboard</h1>
      
      <!-- Lista de Objetivos -->
      <div class="grid gap-6">
        <div v-for="objective in objectives" :key="objective.id" 
             class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <router-link 
              :to="{ name: 'objective', params: { id: objective.id }}"
              class="hover:text-primary-600 dark:hover:text-primary-400"
            >
              <h2 class="text-xl font-semibold dark:text-white">
                {{ objective.title }}
              </h2>
            </router-link>
            <div class="flex space-x-4">
              <span class="text-gray-600 dark:text-gray-400">
                KRs: {{ objective.key_results.length }}
              </span>
              <span class="text-gray-600 dark:text-gray-400">
                Iniciativas: {{ getInitiativesCount(objective.id) }}
              </span>
            </div>
          </div>
          
          <!-- Lista de KRs -->
          <div class="space-y-4">
            <div v-for="kr in objective.key_results" :key="kr.id"
                 class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <router-link 
                :to="{ name: 'key-result', params: { id: kr.id }}"
                class="hover:text-primary-600 dark:hover:text-primary-400"
              >
                <span class="dark:text-white">{{ kr.title }}</span>
              </router-link>
              <div class="flex items-center space-x-2">
                <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div :class="getProgressColorClass(kr.progress)"
                       :style="{ width: `${kr.progress}%` }"
                       class="h-full rounded-full"></div>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ kr.progress }}%
                </span>
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

const getProgressColorClass = (progress) => {
  if (progress < 30) return 'bg-red-500'
  if (progress < 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

const getInitiativesCount = (objectiveId) => {
  return mockInitiatives.filter(initiative => initiative.objectiveId === objectiveId).length
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style> 