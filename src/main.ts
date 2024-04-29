import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
const app = createApp(App)
app.config.globalProperties.$router = router

app.use(router).use(ElementPlus).mount('#app')
