import { createApp } from 'vue';
import ElementPlus from 'element-plus';
// import * as Icons from '@element-plus/icons-vue';
import JsonViewer from 'vue-json-viewer';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { message } from '@/components/Utils/resetMessage';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import 'element-plus/theme-chalk/index.css';
// import '@/assets/font_nfoc9cg8dl/iconfont.css';

const app = createApp(App);
app.config.globalProperties.$router = router;
app.config.globalProperties.$msg = message;

// router guard
// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token')
//   console.log(token)
//   if (to.name != 'main' && !token) next({
//     name:'main'
//   })
//   else next()
// });
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.name !== 'login' && !token) {
    next({
      name: 'login',
    });
  } else { next(); }
});

axios.interceptors.request.use((config) => {
  config.headers.token = localStorage.getItem('token');
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token');
  }
  return config;
},
(error) => {
  Promise.reject(error);
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error', Object.keys(error), error.response);
    if (error.response.status === 401 || error.response.status === 403) {
      router.push({ name: 'login' });
    }
    Promise.reject(error);
  });

app.use(router).use(ElementPlus).use(JsonViewer).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
