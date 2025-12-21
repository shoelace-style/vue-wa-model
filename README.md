# Vue Directive for Two-way Binding Web Awesome Components

A custom Vue 3 directive that makes two-way binding [Web Awesome components](https://webawesome.com) easier.

## Usage

Install the directive with this command.

```sh
npm install @awesome.me/vue-wa-model
```

Next, import the directive into your app and enable it like this.

```js
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/input/input.js';

import WebAwesomeModelDirective from '@awesome.me/vue-wa-model'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(WebAwesomeModelDirective())

app.config.compilerOptions.isCustomElement = tag => tag.startsWith('wa-')

// If using Vite, the above "isCustomElement" needs to be deleted and defined in vite.config.js
// See below for an example vite.config.js

app.mount('#app')
```

Now you can use the `v-wa-model` directive to keep your data in sync!

```html
<wa-input v-wa-model="name"></wa-input>
```

## Why is this necessary?

Currently, there's [no support for v-model on custom elements](https://github.com/vuejs/vue/issues/7830) in Vue. You can handle two-way binding manually, but's it rather verbose.

```html
<!-- This doesn't work -->
<wa-input v-model="name"></wa-input>

<!-- This works, but it's a bit longer -->
<wa-input :value="name" @input="name = $event.target.value"></wa-input>
```

This utility solves this problem by creating a custom directive that works just like `v-model` but for Web Awesome components.

## Using Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('wa-')
        }
      },
    })
  ]
})
```