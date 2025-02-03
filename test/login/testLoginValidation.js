const loginAccountPage = require("../../pages/accessPage/loginAccountPage");

Feature('Validating the Login Process');

Scenario('Login with valid user', ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials('automationuser@gmail.com', 'User@12345678');
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyIfUserWasLogged('User');
  I.saveScreenshot('UserLogged.png');
});

Scenario('Login with invalid email', ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials('invalidemail@gmail.com', 'User@12345678');
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyInvalidLoginValidationMessage();
  I.saveScreenshot('EmailInvalid.png');
});

Scenario('Login with invalid password', ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials('automationuser@gmail.com', 'invalidPassword');
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyInvalidLoginValidationMessage();
  I.saveScreenshot('InvalidPasswordLogin.png');
});

Scenario('Signing Up from the account', ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials('automationuser@gmail.com', 'User@12345678');
  loginAccountPage.clickOnFinishSession('User');
  I.saveScreenshot('LoggedOutUser.png');
});