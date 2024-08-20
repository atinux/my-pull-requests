// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',

  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  // https://nuxt.com/modules
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxthub/core',
    '@vueuse/nuxt',
  ],

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    cache: true,
  },

  icon: {
    serverBundle: 'remote',
  },

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  // https://devtools.nuxt.com
  devtools: { enabled: true },
})
