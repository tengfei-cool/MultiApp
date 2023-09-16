import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import multiApp from '@/multiApp'
import naive from 'naive-ui'
const app = createApp(App)
app.use(router).use(naive).use(multiApp).mount('#app')