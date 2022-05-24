import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import regular from './config/regular'

const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.$regular = regular
app.mount('#app')
