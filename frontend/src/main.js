import './assets/main.css'
import './firebase'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AuthService from './services/AuthService'

const startApp = async () => {
  const app = createApp(App)
  
  try {
    await AuthService.initialize()
  } catch (error) {
    console.error('Erro ao inicializar AuthService:', error)
  }
  
  app.config.globalProperties.$auth = AuthService
  app.use(router)
  app.mount('#app')
}

startApp()
