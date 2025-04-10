import { createRouter, createWebHistory } from 'vue-router'
import OkrDashboard from '../components/OkrDashboard.vue'
import ObjectiveDetail from '../components/ObjectiveDetail.vue'
import KeyResultDetail from '../components/KeyResultDetail.vue'
import OkrOverview from '../components/OkrOverview.vue'
import AuthService from '../services/AuthService'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OkrOverview,
      meta: { requiresAuth: true }
    },
    {
      path: '/objective/:id',
      name: 'objective',
      component: ObjectiveDetail
    },
    {
      path: '/key-result/:id',
      name: 'key-result',
      component: KeyResultDetail
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!AuthService.isAuthenticated()) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 