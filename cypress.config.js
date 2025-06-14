const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js'
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/reports",
    jsonDir: "cypress/reports/.jsons",
    overwrite: false,                     
    html: false,                          
    json: true
  }
});
