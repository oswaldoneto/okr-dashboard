<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Main Content -->
    <main class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Objectives Cards -->
        <div v-for="objective in objectives" :key="objective.id" 
             class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-colors duration-200">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center gap-2 mb-4">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ getShortTitle(objective.title) }}</h2>
              <div class="relative">
                <button 
                  class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  @mouseenter="showTooltipForObjective($event, objective.id)"
                  @mouseleave="startHideTooltip"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 text-gray-500 dark:text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </button>
                <div 
                  v-show="showTooltip === objective.id"
                  class="fixed z-[100] w-72 p-3 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-xl"
                  :style="tooltipStyle"
                  @mouseenter="cancelHideTooltip"
                  @mouseleave="startHideTooltip"
                >
                  {{ objective.title }}
                  <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900 dark:bg-gray-700"></div>
                </div>
              </div>
            </div>
            
            <!-- Key Results -->
            <div class="space-y-4">
              <div v-for="kr in objective.key_results" :key="kr.id" 
                   class="border-l-4 border-primary-500 pl-4">
                <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300">{{ kr.title }}</h3>
                <div class="mt-2">
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div class="bg-primary-600 dark:bg-primary-500 h-2.5 rounded-full transition-all duration-500" 
                         :style="{ width: `${kr.progress}%` }"></div>
                  </div>
                  <div class="flex justify-between mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <span>Progresso</span>
                    <span>{{ kr.progress }}%</span>
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
import { ref, onMounted, computed } from 'vue'
import { mockOkrs } from '../data/okrs'

const objectives = ref([])
const showTooltip = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })
const tooltipTimeout = ref(null)

const tooltipStyle = computed(() => {
  return {
    left: `${tooltipPosition.value.x}px`,
    top: `${tooltipPosition.value.y}px`,
    transform: 'translate(-50%, -100%)'
  }
})

const showTooltipForObjective = (event, objectiveId) => {
  // Limpa qualquer timeout existente
  if (tooltipTimeout.value) {
    clearTimeout(tooltipTimeout.value)
  }

  const rect = event.target.getBoundingClientRect()
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  
  // Calcula a posição do tooltip
  let x = rect.left + (rect.width / 2) + scrollLeft
  let y = rect.top + scrollTop
  
  // Ajusta a posição vertical se estiver muito próximo ao topo
  if (y < 150) { // Se estiver muito próximo ao topo
    y = rect.bottom + scrollTop + 10 // Coloca abaixo do ícone
  } else {
    y -= 10 // Coloca acima do ícone
  }
  
  tooltipPosition.value = { x, y }
  showTooltip.value = objectiveId
}

const startHideTooltip = () => {
  // Adiciona um delay maior antes de esconder o tooltip
  tooltipTimeout.value = setTimeout(() => {
    showTooltip.value = null
  }, 500) // Aumentado para 500ms
}

const cancelHideTooltip = () => {
  if (tooltipTimeout.value) {
    clearTimeout(tooltipTimeout.value)
    tooltipTimeout.value = null
  }
}

const getShortTitle = (title) => {
  const words = title.split(' ')
  if (words.length <= 3) return title
  return words.slice(0, 3).join(' ') + '...'
}

onMounted(() => {
  objectives.value = mockOkrs
})
</script> 