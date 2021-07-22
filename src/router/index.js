import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favorites from '../views/Favorites.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  }, 
  {
    path: '/search',
    name: 'fsearchs',
    component: Search
  }, 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
