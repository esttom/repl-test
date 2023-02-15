import { getCurrentInstance } from 'vue'
import { createI18n } from 'vue-i18n'

let installed = false

export function i18nSetup() {
  if (installed) return
  const i18n = createI18n({
    legacy: false,
    locale: 'ja',
    messages: {
      ja: {
        hello: 'こんにちは'
      },
      en: {
        hello: 'hello'
      }
    }
  })

  const instance = getCurrentInstance()
  instance.appContext.app.use(i18n)
  installed = true
}