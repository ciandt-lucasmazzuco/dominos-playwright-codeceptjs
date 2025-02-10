const loginAccountPage = require("../../pages/accessPage/loginAccountPage");

Feature('Validating the Login Process');

Scenario('Login with valid user', ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials({email: 'beatrizfc+20@ciandt.com', password: 'Alsea@2020'});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyIfUserWasLogged('Hola');
  I.saveScreenshot('UserLogged.png');
});

Scenario('Login with invalid email', ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials({email: 'invalidemail@dominos.com', password: 'Alsea@2020'});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyInvalidLoginValidationMessage('No hemos encontrado una cuenta con esa combinación de e-mail y contraseña.');
  I.saveScreenshot('EmailInvalid.png');
});

Scenario('Login with invalid password', ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials({email: 'beatrizfc+20@ciandt.com', password: 'invalidPassword'});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyInvalidLoginValidationMessage('No hemos encontrado una cuenta con esa combinación de e-mail y contraseña.');
  I.saveScreenshot('InvalidPasswordLogin.png');
});

Scenario('Signing Up from the account', ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials({email: 'beatrizfc+20@ciandt.com', password: 'Alsea@2020'});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.clickOnFinishSession();
  I.saveScreenshot('LoggedOutUser.png');
});