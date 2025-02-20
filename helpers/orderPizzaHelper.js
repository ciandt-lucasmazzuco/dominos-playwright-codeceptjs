const Helper = require("@codeceptjs/helper");

class OrderPizzaHelper extends Helper {
  constructor(config) {
    super(config);
    this.locators = {
      btnNoGraciasFromAgregarTuOrdemPopUp: 'button:has-text("No, gracias")',
    };
  }

  async checkTheModalVerPromos() {
    const playwright = this.helpers['Playwright'];
    const { page } = playwright;

    try {
      const isButtonVisible = await page.isVisible(this.locators.btnNoGraciasFromAgregarTuOrdemPopUp);
      const isButtonEnabled = await page.isEnabled(this.locators.btnNoGraciasFromAgregarTuOrdemPopUp);
    
      if (isButtonVisible && isButtonEnabled) {
        await page.click(this.locators.btnNoGraciasFromAgregarTuOrdemPopUp);
        console.log("Clicked on the button!");
      } else {
        console.log("Button not visible or not clickable, skipping...");
      }
    } catch (error) {
      console.error("Error while checking or clicking the button:", error);
    }
  }
}

module.exports = OrderPizzaHelper;