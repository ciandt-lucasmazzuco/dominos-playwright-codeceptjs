const createAccountPage = require("../../pages/accessPage/createAccountPage");

Feature('Create the Account');

Scenario("Registering First User", ({ I }) => {
  const userData = {
    firstName: "User",
    lastName: "Test",
    email: "automationuser@gmail.com",
    confirmEmail: "automationuser@gmail.com",
    phone: "1234567890",
    password: "User@12345678",
    confirmPassword: "User@12345678",
  };

  createAccountPage.openLoginPage();
  createAccountPage.openTheRegistrationModal();
  createAccountPage.fillRegisterFields(userData);
  createAccountPage.clickOnSaveRegister();
  createAccountPage.validateMessageAccountCreated();
  I.saveScreenshot("UserAccountCreated.png");
}); 