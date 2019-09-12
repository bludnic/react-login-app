import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './i18n/en.json'
import ru from './i18n/ru.json'

const resources = {
  en: {
    translation: en
  },
  ru: {
    translation: ru
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
export const locales = ['en', 'ru']
