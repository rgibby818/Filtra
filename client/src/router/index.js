import { createRouter, createWebHistory } from 'vue-router'
import ImageUpload from '../views/ImageUpload.vue'
import About from '../views/About.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: ImageUpload,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
