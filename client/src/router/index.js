import { createRouter, createWebHistory } from 'vue-router'
import ImageUpload from '../views/ImageUpload.vue'
import History from '../views/History.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: ImageUpload,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
