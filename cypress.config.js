import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:1234",
    supportFile: "cypress/support/e2e.js",
    video: false,
    setupNodeEvents(on, config) {
      // hooks opcionales
    },
  },
});
