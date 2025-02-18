const OrderPizzaHelper = require("./helpers/orderPizzaHelper");

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "./test/test*.js",
  output: "./output",
  helpers: {
    Playwright: {
      browser: "chromium",
      url: "https://www-alsea.preprod.golo03.dominos.com",
      show: false,
      devtools: true,
      waitForTimeout: 10000,
      trace: false,
      video: false,
    },
    DebugHelper: {
      require: "./debug.helper.js",
    },
    LoginHelper: {
      require: "./helpers/loginHelper.js",
    },
    OrderPizzaHelper: {
      require: "./helpers/orderPizzaHelper.js",
    },
  },
  include: {
    I: "./steps_file.js",
    loginAccountPage: "./pages/accessPage/loginAccountPage.js",
    createAccountPage: "./pages/accessPage/createAccountPage.js",
    editUserPage: "./pages/editUserPage/editUserPage.js",
    loginHelper: "./helpers/loginHelper.js", 
    orderPizzaHelper: "./helpers/orderPizzaHelper.js",
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
