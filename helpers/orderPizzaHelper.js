const Helper = require("@codeceptjs/helper");

class OrderPizzaHelper extends Helper {
  constructor(config) {
    super(config);
    this.locators = {
      btnNoGracias: 'button:has-text("No, gracias")',
      btnSpecialtyPizza: '[data-quid="entree-title-specialtypizza"]',
      btnAddPizza: 'button[data-quid="add-pizzabuilder-button"]',
    };
  }

  async checkTheModalVerPromos(maxAttempts = 3) {
    const { page } = this.helpers.Playwright;
  
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(`Attempt ${attempt} of ${maxAttempts}`);
      
      try {
        await page.waitForSelector(this.locators.btnNoGracias, { state: "visible", timeout: 15000 });
        await page.click(this.locators.btnNoGracias);
        console.log("Clicked on 'No, Gracias!'");
        return;
      } catch (error) {
        console.log("'No, Gracias' button not found or not clickable. Checking for Specialty Pizza button...");
        
        try {
          await page.waitForSelector(this.locators.btnSpecialtyPizza, { state: "visible", timeout: 5000 });
          if (await page.isEnabled(this.locators.btnSpecialtyPizza)) {
            console.log("Specialty Pizza button is visible and enabled. Continuing...");
            return;
          }
        } catch (innerError) {
          console.log("Neither button found. Refreshing...");
          if (attempt < maxAttempts) {
            await page.reload();
            await page.waitForLoadState('networkidle');
          }
        }
      }
    }
    console.log("Max attempts reached. Continuing...");
  }

  async clickAddPizzaUntilDisappears(maxAttempts = 5, intervalSeconds = 2) {
    const { page } = this.helpers.Playwright;
    const selector = this.locators.btnAddPizza;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await page.waitForSelector(selector, { state: "visible", timeout: 5000 });
        
        if (await page.isEnabled(selector)) {
          await page.click(selector);
          console.log(`Clicked Add Pizza button (Attempt ${attempt})`);
          
          await page.waitForTimeout(intervalSeconds * 1000);
          
          const isStillVisible = await page.isVisible(selector);
          if (!isStillVisible) {
            console.log("Add Pizza button disappeared. Continuing...");
            return;
          }
        } else {
          console.log("Add Pizza button is visible but not enabled. Waiting...");
          await page.waitForTimeout(intervalSeconds * 1000);
        }
      } catch (error) {
        console.log("Add Pizza button not found or another error occurred. Continuing...");
        return;
      }
    }
    console.log(`Max attempts (${maxAttempts}) reached. Continuing...`);
  }
}

module.exports = OrderPizzaHelper;