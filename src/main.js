import './assets/styles/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'light' }
})

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
export const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(ElementPlus)
app.mount('#app')
