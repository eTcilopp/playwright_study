// @ts-check
const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  reporter: 'html',  // default reporters. There are other reporters available
  use: {
    headless: false,  // always run in headed mode
    screenshot: 'on', // will take screenshot on each step
    trace: 'retain-on-failure',  // detailed report on every automation step
    expect: {
      timeout: 5000
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

});

