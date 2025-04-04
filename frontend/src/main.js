import './assets/main.css'
import './firebase'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AuthService from './services/AuthService'

const app = createApp(App)

// Inicializa o AuthService antes de montar o aplicativo
AuthService.initialize()
  .then(() => {
    app.config.globalProperties.$auth = AuthService
    app.use(router)
    app.mount('#app')
  })
  .catch(error => {
    console.error('Erro ao inicializar AuthService:', error)
    // Ainda monta o app mesmo se houver erro, para permitir tentativas de login
    app.config.globalProperties.$auth = AuthService
    app.use(router)
    app.mount('#app')
  })
