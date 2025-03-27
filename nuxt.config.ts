// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxt/image",
    "@compodium/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  typescript: {
    strict: true,
  },
  nitro: {
    preset: "node-server",
  },
});
