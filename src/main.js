import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import regular from './config/regular'
import apis from './api/apis'

const app = createApp(App)
app.use(router)
app.use(store)
app.config.globalProperties.$regular = regular
app.config.globalProperties.$apis = apis
app.mount('#app')
