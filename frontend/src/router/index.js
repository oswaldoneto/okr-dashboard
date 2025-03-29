import { createRouter, createWebHistory } from 'vue-router'
import OkrDashboard from '../components/OkrDashboard.vue'
import ObjectiveDetail from '../components/ObjectiveDetail.vue'
import KeyResultDetail from '../components/KeyResultDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OkrDashboard
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

export default router 