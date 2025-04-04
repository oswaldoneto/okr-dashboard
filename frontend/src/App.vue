<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Auth from './components/Auth.vue'
import AuthService from './services/AuthService'
import { mockOkrs } from './data/okrs'

const objectives = ref([])
const isAuthenticated = ref(false)

onMounted(async () => {
  await AuthService.initialize()
  isAuthenticated.value = await AuthService.isAuthenticated()
  if (isAuthenticated.value) {
    objectives.value = mockOkrs
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <Auth />
    <div v-if="isAuthenticated" class="flex">
      <!-- Sidebar -->
      <Sidebar :objectives="objectives" class="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-lg" />
      
      <!-- Main Content -->
      <div class="flex-1 ml-64">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
