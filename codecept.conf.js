const EditUserPage = require("./pages/editUserPage/editUserPage");

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "./test/login/test*.js",
  output: "./output",
  helpers: {
    Playwright: {
      browser: "chromium",
      url: "https://www.dominos.com.mx",
      show: true,
      devtools: true,
      waitForTimeout: 5000,
      trace: true,
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
