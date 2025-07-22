import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://app.qa.nesto.ca",
    specPattern: "nesto_takehome_kartik_muchandi/e2e/**/*.cy.ts",
    supportFile: "nesto_takehome_kartik_muchandi/support/e2e.ts",
    fixturesFolder: "nesto_takehome_kartik_muchandi/fixtures",
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    password: "Sup3r5ecre7@",
  },
  video: true,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  numTestsKeptInMemory: 0,
  retries: {
    runMode: 2,
    openMode: 0,
  },
}); 