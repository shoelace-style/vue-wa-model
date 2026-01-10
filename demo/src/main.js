import "@awesome.me/webawesome/dist/styles/webawesome.css"
import "@awesome.me/webawesome/dist/components/input/input.js"

import WebAwesomeModelDirective from '@shoelace-style/vue-wa-model'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(WebAwesomeModelDirective())

// app.config.compilerOptions.isCustomElement = tag => tag.startsWith('sl-')
// ^ Not needed. Defined in vite.config.js

app.mount('#app')
