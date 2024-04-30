import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/supv',
    name: 'supv',
    component: () => import('../components/CamCheck.vue'),
  },
  {
    path: '/flow',
    name: 'flow',
    component: () => import('../components/Flow/DragDrop.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/DragDemo.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
