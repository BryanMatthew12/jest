const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 't6uzjh',
  e2e: {
    baseUrl: 'https://localhost:8080'
  },
});
