const { I } = inject();

const locators = {
  btnIniciarSesion: '[data-quid="profile-action--login"]',
  lblEmailField: { role: "textbox", name: "E-mail" },
  fieldEmail: () => "#Email",
  fieldPassword: () => "#Password",
  btnIniciarSesionParaEstaOrden:
    '[data-quid="pizza-profile-login-button-login-once"]',
  welcomeMessage: { css: '[aria-label="primary"]' },
  userWasLogged: ".js-loggedInUserName",
  txtInvalidCredentialsErrorMessage: ".errorText",
  btnFinishSessionLogoutButton: '[data-quid="nav-sign-out-button"]',
  btnIniciarSesionSecondOption: ".btn.btn--small.js-loginSubmit",
};

class LoginAccountPage {
  async openLoginPage() {
    I.amOnPage("/?marketUrl=dominospizza.es");
    I.waitForElement("body", 30);

    I.denyGeolocationPermission(); 
  }

  clickOnIniciarSesion() {
    I.waitForElement(locators.btnIniciarSesion, 30);
    I.seeElement(locators.btnIniciarSesion);
    I.click(locators.btnIniciarSesion);
  }

  fillTheLoginCredentials(credentials) {
    const { email, password } = credentials;
    I.waitForElement(locators.lblEmailField, 30);
    I.seeElement(locators.lblEmailField);
    I.fillField(locators.fieldEmail(), email);
    I.fillField(locators.fieldPassword(), password);
  }

  async clickOnTheStartSession() {
    I.checkTheLoginButtonAndClickOnIt();
  }

  verifyIfUserWasLogged(userName) {
    I.waitForElement(locators.welcomeMessage, 30);
    I.waitForElement(locators.userWasLogged, 30);
    I.seeElement(locators.userWasLogged);
    I.see(userName, locators.userWasLogged);
  }

  verifyInvalidLoginValidationMessage(invalidMessage) {
    I.waitForElement(locators.txtInvalidCredentialsErrorMessage, 30);
    I.see(invalidMessage, locators.txtInvalidCredentialsErrorMessage);
  }

  clickOnFinishSession() {
    I.waitForElement(locators.btnFinishSessionLogoutButton, 30);
    I.seeElementInDOM(locators.btnFinishSessionLogoutButton);
    I.wait(2);
    I.click(locators.btnFinishSessionLogoutButton);

    I.waitForElement(locators.btnIniciarSesion, 30);
    I.seeElementInDOM(locators.btnIniciarSesion);
  }
}

module.exports = new LoginAccountPage();
