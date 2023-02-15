<script setup lang="ts">
import { watchEffect } from 'vue'
import { Repl, ReplStore, File, compileFile } from '@vue/repl'
import i18nCode from './template/i18n.js?raw'
import mainCode from './template/main.vue?raw'
import welcomeCode from './template/welcome.vue?raw'
import '@vue/repl/style.css'

const query = new URLSearchParams(location.search)

const store = new ReplStore({
  serializedState: location.hash.slice(1),
  showOutput: query.has('showOutput'),
  outputMode: (query.get('outputMode') || 'preview'),
})

store.state.files['i18n.ts'] = new File('i18n.ts', i18nCode, true)
store.state.files['Main.vue'] = new File('Main.vue', mainCode, true)
store.state.files['App.vue'] = new File('App.vue', welcomeCode)
store.state.mainFile = 'Main.vue'
for (const file of Object.values(store.state.files)) {
  compileFile(store, file)
}
store.setActive('App.vue')

watchEffect(() => history.replaceState({}, '', store.serialize()))

store.setImportMap({
  imports: {
    'vue-i18n': 'https://unpkg.com/vue-i18n@9/dist/vue-i18n.esm-browser.js'
  }
})
</script>

<template>
  <Repl :store="store" auto-resize />
</template>

<style scoped>
.vue-repl {
  height: 100vh;
  width: 100vw;
}
</style>