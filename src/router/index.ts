import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DragDemo from '../components/DragDemo.vue'
// import CamCheck from '../components/CamCheck.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/supv',
    name: 'supv',
    component: () => import('../components/CamCheck.vue')
    // component: CamCheck
  },
  {
    path: '/chart',
    name: 'chart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../components/DragDemo.vue')
    component: DragDemo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
