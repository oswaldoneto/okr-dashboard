<template>
  <div class="auth-container">
    <div v-if="isAuthenticated">
      <span>Bem-vindo, {{ displayName }}</span>
      <button @click="logout" class="auth-button logout">Sair</button>
    </div>
    <div v-else>
      <button @click="login" class="auth-button login">Entrar com Microsoft</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import AuthService from '../services/AuthService'

export default {
  name: 'Auth',
  setup() {
    const isAuthenticated = ref(false)
    const displayName = ref('')

    const checkAuth = async () => {
      try {
        isAuthenticated.value = await AuthService.isAuthenticated()
        if (isAuthenticated.value) {
          const userInfo = await AuthService.getUserInfo()
          displayName.value = userInfo.displayName
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        isAuthenticated.value = false
      }
    }

    const login = async () => {
      try {
        await AuthService.login()
      } catch (error) {
        console.error('Erro ao fazer login:', error)
      }
    }

    const logout = async () => {
      try {
        await AuthService.logout()
        isAuthenticated.value = false
        displayName.value = ''
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
      }
    }

    onMounted(async () => {
      await checkAuth()
    })

    return {
      isAuthenticated,
      displayName,
      login,
      logout
    }
  }
}
</script>

<style scoped>
.auth-container {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.auth-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin-left: 1rem;
}

.login {
  background-color: #0078d4;
  color: white;
}

.logout {
  background-color: #e0e0e0;
  color: #333;
}

.auth-button:hover {
  opacity: 0.9;
}
</style> 