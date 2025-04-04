import './assets/main.css'
import './firebase'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AuthService from './services/AuthService'

// Initialize auth service
AuthService.initialize().then(() => {
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}).catch(error => {
  console.error('Failed to initialize auth service:', error)
})
