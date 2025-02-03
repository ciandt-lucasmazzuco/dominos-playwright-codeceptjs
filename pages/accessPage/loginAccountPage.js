const { I } = inject();

const locators = {
  btnIniciarSesion: { role: "link", name: "Iniciar Sesión" },
  txtIniciarSesion: { role: "heading", name: "Iniciar sesión" },
  fieldEmail: (email) => ({ role: 'textbox', name: `Correo Electrónico: ${email || ''}` }),
  fieldPassword: (password) => ({ role: 'textbox', name: `Contraseña: ${password || ''}` }),
  btnIniciarSesionParaEstaOrden: {
    role: "button",
    name: "Iniciar Sesión Para Esta Orden",
  },
  lblUserLogged: { label: "primary" },
  welcomeMessage: { css: '[aria-label="primary"]' },

  txtInvalidEmailMessage: {
    xpath: "//p[contains(text(), 'No pudimos localizar a un perfil Pizza')]", },
    btnFinishSession: (userName) => ({ role: 'link', name: `¿No eres ${userName}? Cerrar Sesión`}),
};

class LoginAccountPage {
  openLoginPage() {
    I.amOnPage("/");
    I.waitForElement(locators.btnIniciarSesion, 10);
    I.click(locators.btnIniciarSesion);
  }

  fillTheLoginCredentials(email, password) {
    I.waitForElement(locators.emailField, 5);
    I.fillField(locators.fieldEmail(email), email);
    I.fillField(locators.fieldPassword(password), password);    
  }

  clickOnTheStartSession() {
    I.waitForElement(locators.btnIniciarSesionParaEstaOrden, 10);
    I.click(locators.btnIniciarSesionParaEstaOrden);
  }

  verifyIfUserWasLogged(userName) {
    I.waitForElement(locators.welcomeMessage);
    I.seeTitleEquals(`Hola, ${userName}.`, locators.welcomeMessage);
  }

  verifyInvalidLoginValidationMessage() {
    I.waitForElement(locators.txtInvalidEmailMessage, 10);
    I.seeTextEquals(
      "No pudimos localizar a un perfil Pizza con esa combinación de correo " +
        "electrónico y contraseña. Por favor, asegúrese de que está utilizando " +
        "la dirección de correo electrónico asociada con su Perfil de Pizza .",
      locators.txtInvalidEmailMessage);
  }

  clickOnFinishSession(userName) {
    I.waitForElement(locators.btnFinishSession(userName), 10);
    I.click(locators.btnFinishSession(userName));
    I.see(locators.btnIniciarSesion, 10);
  }
};

module.exports = LoginAccountPage;
