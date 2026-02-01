import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

<<<<<<< HEAD
=======
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'light' }
})

>>>>>>> dafb482343956a8fc6c5e244410ca99d50671bf7
import App from './App.vue'
import router from './router'

export const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
