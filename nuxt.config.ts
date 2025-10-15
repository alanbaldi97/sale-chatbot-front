// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  i18n: {
    defaultLocale: 'es',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'es', language: 'es-ES', file: 'es.json' },
    ],
    
  },
  runtimeConfig: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  }
})