const { I } = inject();

const locators = {
  btnIniciarSesion: '[data-quid="profile-action--login"]',
  lblEmailField: { role: "textbox", name: "E-mail" },
  fieldEmail: () => '#Email',
  fieldPassword: () => '#Password',
  btnIniciarSesionParaEstaOrden: '[data-quid="pizza-profile-login-button-login-once"]',
  welcomeMessage: { css: '[aria-label="primary"]' },
  userWasLogged: '.js-loggedInUserName',
  txtInvalidCredentialsErrorMessage: '.errorText',
  btnFinishSessionLogoutButton: '[data-quid="nav-sign-out-button"]',
};

class LoginAccountPage {
  openLoginPage() {
    try {
      I.amOnPage("https://www-alsea.preprod.golo03.dominos.com/?marketUrl=dominospizza.es");
      I.waitForElement('body', 30); 
      pause();
      I.waitForElement(locators.btnIniciarSesion, 30);
      I.seeElement(locators.btnIniciarSesion, 30);
      I.click(locators.btnIniciarSesion);

    } catch (error) {
      console.error('Error to load the login page:', error.message);
      
      I.saveScreenshot('login_page_error.png');
      
      throw new Error(`Failed to load the login page: ${error.message}`);
    }
  }

  fillTheLoginCredentials(credentials) {
    const { email, password } = credentials;
    I.waitForElement(locators.lblEmailField, 30);
    I.seeElement(locators.lblEmailField);
    I.fillField(locators.fieldEmail(), email);
    I.fillField(locators.fieldPassword(), password);
  }

  clickOnTheStartSession() {
    I.waitForElement(locators.btnIniciarSesionParaEstaOrden, 30);
    I.click(locators.btnIniciarSesionParaEstaOrden);
  }

  verifyIfUserWasLogged(userName) {
    I.waitForElement(locators.welcomeMessage);
    I.seeElement(locators.userWasLogged);
    I.see(userName, locators.userWasLogged);
  }

  verifyInvalidLoginValidationMessage(invalidMessage) {
    I.waitForElement(locators.txtInvalidCredentialsErrorMessage, 30);
    I.see(invalidMessage, locators.txtInvalidCredentialsErrorMessage);
  }

  clickOnFinishSession() {
    I.waitForElement(locators.btnFinishSessionLogoutButton, 30);
    I.click(locators.btnFinishSessionLogoutButton);
    I.waitForElement(locators.btnIniciarSesion, 30);
    I.seeElementInDOM(locators.btnIniciarSesion);
  }
};

module.exports = new LoginAccountPage();
