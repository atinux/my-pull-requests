// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // https://nuxt.com/modules
  modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt'],

  // https://devtools.nuxt.com
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  compatibilityDate: '2025-09-08',

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
})
