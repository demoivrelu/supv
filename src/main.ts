import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import 'element-plus/theme-chalk/index.css';
import '@/assets/fonts/font_nfoc9cg8dl/iconfont.css';

const app = createApp(App);
app.config.globalProperties.$router = router;

app.use(router).use(ElementPlus).mount('#app');
