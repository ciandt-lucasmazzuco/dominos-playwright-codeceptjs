const createAccountPage = require("../../pages/accessPage/createAccountPage");
const loginAccountPage = require("../../pages/accessPage/loginAccountPage");

Feature('Create the Account');

xScenario("Registering First User", ({ I }) => {
  const userData = {
    firstName: "User",
    lastName: "Test",
    email: "automationuser@gmail.com",
    confirmEmail: "automationuser@gmail.com",
    phone: "1234567890",
    password: "User@12345678",
    confirmPassword: "User@12345678",
  };

  loginAccountPage.openLoginPage();
  createAccountPage.openTheRegistrationModal();
  createAccountPage.fillRegisterFields(userData);
  createAccountPage.clickOnSaveRegister();
  createAccountPage.validateMessageAccountCreated();
  I.saveScreenshot("UserAccountCreated.png");
}); 