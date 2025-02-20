const Helper = require('@codeceptjs/helper');

class LoginHelper extends Helper {
  constructor(config) {
    super(config);
    this.locators = {
      btnIniciarSesionParaEstaOrden: 'button.js-loginSubmit:has-text("Iniciar sesión para este pedido")',
      btnIniciarSesionSecondOption: ".btn.btn--small.js-loginSubmit",
    };
  }

  async checkTheLoginButtonAndClickOnIt() {
    const playwright = this.helpers['Playwright'];
    const { page } = playwright;

    try {
      await page.click(this.locators.btnIniciarSesionParaEstaOrden);
      console.log("Clicked on the first option!");
      return;
    } catch (error) {
      console.log("First button not found, trying the second...");
    }

    try {
      await page.click(this.locators.btnIniciarSesionSecondOption);
      console.log("Clicked on the second option!");
    } catch (innerError) {
      console.error("None of the buttons were found!");
      throw new Error("Failed to click in both of buttons!");
    }
  }
}

module.exports = LoginHelper;
