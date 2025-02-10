/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "./test/test*.js",
  output: "./output",
  helpers: {
    Playwright: {
      browser: "chromium",
      url: "https://www-alsea.preprod.golo03.dominos.com/?marketUrl=dominospizza.es",
      show: true,
      devtools: true,
      waitForTimeout: 10000,
      trace: false,
      video: false,
      launchOptions: {
        args: ["--disable-geolocation"],
      },
      contextOptions: {
        permissions: [],
      },
    },
    DebugHelper: {
      require: "./debug.helper.js",
    },
  },
  include: {
    I: "./steps_file.js",
    loginAccountPage: "./pages/accessPage/loginAccountPage.js",
    createAccountPage: "./pages/accessPage/createAccountPage.js",
    editUserPage: "./pages/editUserPage/editUserPage.js",
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
      retries: 2,
    },
    allure: {
      enabled: true,
      require: "@codeceptjs/allure-legacy",
    },
  },
  name: "Dominos-Alsea-WebAutomation",
};
