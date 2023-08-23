import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import multiApp from '@/multiApp'
const app = createApp(App)
app.use(router).use(multiApp).mount('#app')
