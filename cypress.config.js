import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:1234",
    video: false,
    setupNodeEvents(on, config) {
      // hooks opcionales
    },
  },
});
