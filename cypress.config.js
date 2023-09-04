/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('cypress')

module.exports = defineConfig({
    numTestsKeptInMemory: 15,
    defaultCommandTimeout: 15000,
    "watchForFileChanges": false,
    reporter: 'cypress-mochawesome-reporter',


    env: {
        apiUrl: 'https://admin-staging.barmg.com',
        device: 'desktop',
  
    },
    retries: {
        runMode: 1,
        openMode: 0
    },
    
    viewportHeight: 768,
    viewportWidth: 1400,
    e2e: {
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
          },
 
        // setupNodeEvents: function (on, config) {
        //     return require('./cypress/plugins/index.js')(on, config)
        // },
        screenshotOnRunFailure:true,
        baseUrl: 'https://web-staging.barmg.com'
    }
})