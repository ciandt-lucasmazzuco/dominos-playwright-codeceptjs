
/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "./test/**/*Test.js",
  output: "./output",
  helpers: {
    Playwright: {
      browser: "chromium",
      url: "https://www-alsea.preprod.golo03.dominos.com",
      show: false,
      devtools: false,
      waitForTimeout: 10000,
      trace: false,
      video: false,
    },
    DebugHelper: {
      require: "./debug.helper.js",
    },
    loginHelper: {
      require: "./helpers/loginHelper.js",
    },
    orderPizzaHelper: {
      require: "./helpers/orderPizzaHelper.js",
    },
    myPlaywrightHelper: {
      require: './helpers/myPlaywrightHelper.js'  
    },
  },
  include: {
    I: "./steps_file.js",
    loginAccountPage: "./pages/accessPage/loginAccountPage.js",
    createAccountPage: "./pages/accessPage/createAccountPage.js",
    editUserPage: "./pages/editUserPage/editUserPage.js",
    loginHelper: "./helpers/loginHelper.js", 
    orderPizzaHelper: "./helpers/orderPizzaHelper.js",
    myPlaywrightHelper: "./helpers/myPlaywrightHelper.js"
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
