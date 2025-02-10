const locators = {
  
};

class OrderAPizzaPage {
  openLoginPage() {
    I.amOnPage('/');
    I.waitForElement(locators.btnLoginLink, 10);
    I.doubleClick(locators.btnLoginLink);
  }
}

module.exports = new OrderAPizzaPage();