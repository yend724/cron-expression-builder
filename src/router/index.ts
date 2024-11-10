import { createRouter, createWebHistory } from 'vue-router'
import RootView from '../views/RootView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Root',
      component: RootView,
    },
  ],
})

export default router
