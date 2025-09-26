import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  runtimeConfig: {
    public: {
      apiBaseUrl: "",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["shadcn-nuxt", "@vueuse/nuxt", "nuxt-auth-sanctum"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  sanctum: {
    baseUrl: "http://localhost:8000",
    mode: "token",
    endpoints: {
      login: "api/login",
      logout: "api/logout",
    },
    redirect: {
      onAuthOnly: "/",
      onGuestOnly: "/reports",
      onLogin: "/",
      onLogout: "/",
    },
  },
});
