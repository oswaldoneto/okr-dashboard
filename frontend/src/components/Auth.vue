<template>
  <div class="auth-container">
    <div v-if="!isAuthenticated" class="login-container">
      <h2>Bem-vindo ao OKR Dashboard</h2>
      <button @click="login" class="login-button">
        Entrar com Microsoft
      </button>
    </div>
    <div v-else class="user-info">
      <span>Bem-vindo, {{ userDisplayName }}</span>
      <button @click="logout" class="logout-button">
        Sair
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import AuthService from '../services/AuthService';

export default {
  name: 'Auth',
  setup() {
    const isAuthenticated = ref(false);
    const userDisplayName = ref('');

    const checkAuth = async () => {
      isAuthenticated.value = AuthService.isAuthenticated();
      if (isAuthenticated.value) {
        try {
          const userInfo = await AuthService.getUserInfo();
          userDisplayName.value = userInfo.displayName;
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    const login = async () => {
      try {
        await AuthService.login();
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    const logout = async () => {
      try {
        await AuthService.logout();
        isAuthenticated.value = false;
        userDisplayName.value = '';
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    onMounted(async () => {
      await AuthService.initialize();
      await checkAuth();
    });

    return {
      isAuthenticated,
      userDisplayName,
      login,
      logout
    };
  }
};
</script>

<style scoped>
.auth-container {
  padding: 1rem;
}

.login-container {
  text-align: center;
  padding: 2rem;
}

.login-button, .logout-button {
  background-color: #0078d4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.login-button:hover, .logout-button:hover {
  background-color: #106ebe;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-button {
  background-color: #d83b01;
}

.logout-button:hover {
  background-color: #a42e01;
}
</style> 