const { defineConfig } = require("cypress");
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse")

module.exports = defineConfig({
  projectId: 't6uzjh',
  e2e: {
    baseUrl: 'https://localhost:8080',
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
      prepareAudit(launchOptions);
      });
      on("task", {
      lighthouse: lighthouse(),
      // pa11y: pa11y(console.log.bind(console)),
      });
      },
  },
});