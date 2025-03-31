<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <main class="p-6">
      <div class="space-y-8">
        <!-- Objectives -->
        <div v-for="objective in objectives" :key="objective.id" 
             class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
          <div class="px-6 py-5">
            <!-- Objective Header -->
            <div class="flex items-start justify-between mb-6">
              <router-link 
                :to="{ name: 'objective', params: { id: objective.id }}"
                class="group"
              >
                <div class="flex items-start space-x-4">
                  <div>
                    <h2 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {{ objective.id }}
                    </h2>
                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {{ objective.title }}
                    </p>
                  </div>
                </div>
              </router-link>
              
              <div class="flex items-center space-x-4">
                <div class="text-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">KRs</span>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ objective.key_results.length }}
                  </p>
                </div>
                <div class="text-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Iniciativas</span>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ getInitiativesCount(objective.id) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Key Results Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <router-link
                v-for="kr in objective.key_results"
                :key="kr.id"
                :to="{ name: 'key-result', params: { id: kr.id }}"
                class="group"
              >
                <div class="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors duration-200">
                  <div class="flex items-start space-x-3">
                    <div :class="getHealthIndicatorColor(kr.progress)" 
                         class="w-3 h-3 mt-1.5 rounded-full flex-shrink-0"></div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        {{ kr.id }}
                      </h3>
                      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {{ truncateText(kr.title, 80) }}
                      </p>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mockOkrs } from '../data/okrs'
import { mockInitiatives } from '../data/initiatives'

const objectives = ref([])

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

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

onMounted(() => {
  objectives.value = mockOkrs
})
</script> 