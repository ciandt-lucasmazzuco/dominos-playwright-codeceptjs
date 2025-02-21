const loginAccountPage = require("../../pages/accessPage/loginAccountPage");

Feature('Validating the Login Process');

xScenario('Login with valid user', async ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.clickOnIniciarSesion();
  loginAccountPage.fillTheLoginCredentials({email: 'beatrizfc+20@ciandt.com', password: 'Alsea@2020'});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyIfUserWasLogged('Hola');
  I.saveScreenshot('UserLogged.png');
});

xScenario('Login with invalid email', async ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.clickOnIniciarSesion();
  loginAccountPage.fillTheLoginCredentials({email: 'invalidemail@dominos.com', password: 'Alsea@2020'});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyInvalidLoginValidationMessage('No hemos encontrado una cuenta con esa combinación de e-mail y contraseña.');
  I.saveScreenshot('EmailInvalid.png');
});

xScenario('Login with invalid password', async ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.clickOnIniciarSesion();
  loginAccountPage.fillTheLoginCredentials({email: 'beatrizfc+20@ciandt.com', password: 'invalidPassword'});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyInvalidLoginValidationMessage('No hemos encontrado una cuenta con esa combinación de e-mail y contraseña.');
  I.saveScreenshot('InvalidPasswordLogin.png');
});

Scenario('Signing Up from the account', async ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.clickOnIniciarSesion();
  loginAccountPage.fillTheLoginCredentials({email: 'beatrizfc+20@ciandt.com', password: 'Alsea@2020'});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.clickOnFinishSession();
  I.saveScreenshot('LoggedOutUser.png');
});