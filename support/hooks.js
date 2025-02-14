const loginAccountPage = require("./pages/accessPage/loginAccountPage");

module.exports = function () {
  return actor({
    before: function (test) {
      console.log("Starting the Suite:", test.title);
      const I = this;
      try {
        const userCredentials = {
          email: "beatrizfc+20@ciandt.com",
          password: "Alsea@2020",
        };

        loginAccountPage.openLoginPage();
        loginAccountPage.fillTheLoginCredentials(userCredentials);
        loginAccountPage.clickOnTheStartSession();
        loginAccountPage.verifyIfUserWasLogged("Hola");
      } catch (error) {
        console.error("Error in before hook:", error.message);
        I.saveScreenshot("beforeHookError.png");
        throw error;
      }
    },

    after: function (test) {
      console.log("Finishing the Suite:", test.title);
      const I = this;
      try {
        loginAccountPage.clickOnFinishSession();
        I.clearCookie();
      } catch (error) {
        console.error("Error in after hook:", error.message);
        I.saveScreenshot("afterHookError.png");
      }
    },
  });
};
