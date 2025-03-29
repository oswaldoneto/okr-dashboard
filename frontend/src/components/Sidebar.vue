<template>
  <aside class="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-50">
    <!-- Logo e Título -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">DIO OKR</h2>
      
      <!-- Dark Mode Toggle -->
      <button
        @click="toggleDarkMode"
        class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        :title="isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'"
      >
        <!-- Sun icon for dark mode -->
        <svg 
          v-if="isDarkMode"
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 text-yellow-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
        <!-- Moon icon for light mode -->
        <svg 
          v-else
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5 text-gray-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      </button>
    </div>

    <!-- Menu de Navegação -->
    <nav class="p-4">
      <ul class="space-y-2">
        <li>
          <router-link 
            to="/" 
            class="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :class="{ 'bg-gray-100 dark:bg-gray-700': $route.path === '/' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Visão Geral
          </router-link>
        </li>
        
        <li v-for="objective in objectives" :key="objective.id">
          <router-link 
            :to="`/objective/${objective.id}`"
            class="flex items-center p-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :class="{ 'bg-gray-100 dark:bg-gray-700': $route.params.id === objective.id }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {{ getShortTitle(objective.title) }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  objectives: {
    type: Array,
    required: true
  }
})

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

const getShortTitle = (title) => {
  const words = title.split(' ')
  if (words.length <= 3) return title
  return words.slice(0, 3).join(' ') + '...'
}

onMounted(() => {
  // Verifica se o usuário tem preferência por dark mode no sistema
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script> 