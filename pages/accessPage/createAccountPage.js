const { I } = inject();

const locators = {
  btnLoginLink: { role: 'link', name: 'Iniciar Sesión' },
  txtLoginModal: { role: 'heading', name: 'Iniciar sesión' },
  btnCreateAccount: { role: 'link', name: 'Registrarme▶' },
  txtProfileModal: { text: 'Crear Perfil' },

  firstNameField: (firstName) => ({ role: 'textbox', name: `Nombre(s): ${firstName || ''}` }),
  lastNameField: (lastName) => ({ role: 'textbox', name: `Apellido(s): ${lastName || ''}` }),
  emailField: (email) => ({ role: 'textbox', name: `Correo electrónico : ${email || ''}` }),
  confirmEmailField: (confirmEmail) => ({ role: 'textbox', name: `Confirmar dirección de correo: ${confirmEmail || ''}` }),
  phoneField: (phone) => ({ role: 'textbox', name: `Número de teléfono: ${phone || ''}` }),
  passwordField: (password) => ({ role: 'textbox', name: `Contraseña: ${password || ''}`, exact: true }),
  confirmPasswordField: (confirmPassword) => ({ role: 'textbox', name: `Confirmar Contraseña: ${confirmPassword || ''}` }),

  btnRegister: { role: 'button', name: 'Registrarme' },
  txtCongratulationsMessage: { text: '¡Felicitaciones! Su Perfil de' },
};

class CreateAccountPage {
  openLoginPage() {
    I.amOnPage('https://www-alsea.preprod.golo03.dominos.com/?marketUrl=dominospizza.es');
    I.waitForElement(locators.btnLoginLink, 10);
    I.doubleClick(locators.btnLoginLink);
  }

  openTheRegistrationModal() {
    I.waitForElement(locators.txtLoginModal, 10);
    I.click(locators.btnCreateAccount);
    I.waitForElement(locators.txtProfileModal, 10);
  }

  fillRegisterFields(userData) {
    I.fillField(locators.firstNameField(userData.firstName), userData.firstName);
    I.fillField(locators.lastNameField(userData.lastName), userData.lastName);
    I.fillField(locators.emailField(userData.email), userData.email);
    I.fillField(locators.confirmEmailField(userData.confirmEmail), userData.confirmEmail);
    I.fillField(locators.phoneField(userData.phone), userData.phone);
    I.fillField(locators.passwordField(userData.password), userData.password);
    I.fillField(locators.confirmPasswordField(userData.confirmPassword), userData.confirmPassword);
  }

  clickOnSaveRegister() {
    I.click(locators.btnRegister);
  }

  validateMessageAccountCreated() {
    I.seeElement(locators.txtCongratulationsMessage, 10);
  }
}

module.exports = new CreateAccountPage();
