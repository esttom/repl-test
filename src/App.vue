<script setup lang="ts">
import { watchEffect } from 'vue'
import { Repl, ReplStore, File, compileFile } from '@vue/repl'
import { atou } from './utils'
import i18nCode from './template/i18n.ts?raw'
import mainCode from './template/main.vue?raw'
import welcomeCode from './template/welcome.vue?raw'
import '@vue/repl/style.css'

const serializedState = location.hash.slice(1)

const store = new ReplStore()

store.state.files['i18n.ts'] = new File('i18n.ts', i18nCode, true)
store.state.files['Main.vue'] = new File('Main.vue', mainCode, true)
if (serializedState) {
  const saved = JSON.parse(atou(serializedState))
  for (const [filename, file] of Object.entries(saved)) {
    if (filename === '_o') continue
    store.state.files[filename] = new File(filename, file as string, filename.match(/i18n\.ts|Main\.vue/) !== null)
  }
} else {
  store.state.files['App.vue'] = new File('App.vue', welcomeCode)
}

store.state.mainFile = 'Main.vue'
for (const file of Object.values(store.state.files)) {
  compileFile(store, file)
}
store.setActive('App.vue')

watchEffect(() => history.replaceState({}, '', store.serialize()))

store.setImportMap({
  imports: {
    'vue-i18n': 'https://unpkg.com/vue-i18n@9/dist/vue-i18n.esm-browser.prod.js'
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