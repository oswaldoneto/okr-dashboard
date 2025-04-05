<script setup>
import { ref, onMounted, watch } from 'vue'
import Sidebar from './components/Sidebar.vue'
import AuthService from './services/AuthService'
import { mockOkrs } from './data/okrs'

const objectives = ref([])
const isAuthenticated = ref(false)

const loadData = async () => {
  try {
    isAuthenticated.value = await AuthService.isAuthenticated()
    if (isAuthenticated.value) {
      objectives.value = mockOkrs
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  }
}

onMounted(async () => {
  await loadData()
})

// Observa mudanças no estado de autenticação
watch(isAuthenticated, async (newValue) => {
  if (newValue) {
    objectives.value = mockOkrs
  } else {
    objectives.value = []
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div v-if="isAuthenticated" class="flex">
      <!-- Sidebar -->
      <Sidebar :objectives="objectives" class="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-lg" />
      
      <!-- Main Content -->
      <div class="flex-1 ml-64">
        <router-view :objectives="objectives"></router-view>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-screen max-w-lg mx-auto px-4">
      <!-- Logo e Título -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">OKR Dashboard</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">Plataforma de Gestão de OKRs</p>
      </div>

      <!-- Aviso de Conteúdo Restrito -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 text-center shadow-lg w-full">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Este é um ambiente exclusivo para colaboradores da DIO.
          Por favor, faça login com sua conta corporativa para acessar.
        </p>
      </div>

      <!-- Botão de Login -->
      <button 
        @click="() => AuthService.login()"
        class="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-lg"
      >
        <svg 
          class="w-5 h-5 mr-2" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M0 0h12v12H0z" fill="#F25022"/>
          <path d="M12 0h12v12H12z" fill="#7FBA00"/>
          <path d="M0 12h12v12H0z" fill="#00A4EF"/>
          <path d="M12 12h12v12H12z" fill="#FFB900"/>
        </svg>
        Entrar com Microsoft
      </button>
    </div>
  </div>
</template>

<style scoped>
.bg-primary-600 {
  background-color: #0078d4;
}

.bg-primary-700 {
  background-color: #006abc;
}

.hover\:bg-primary-700:hover {
  background-color: #006abc;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
