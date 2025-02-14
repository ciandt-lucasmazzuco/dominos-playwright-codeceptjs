
const loginAccountPage = require("../../pages/accessPage/loginAccountPage");
const orderPizzaPage = require("../../pages/orderPizzaPage/orderPizzaPage").default;

Feature('Ordering a Pizza');

Before(({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials({email: 'beatrizfc+20@ciandt.com', password: 'Alsea@2020'});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyIfUserWasLogged('Hola');
});

Scenario("Order a pizza", ({ I }) => {

  const cardCredentials = {
    number: '4111-1111-1111-1111',
    expirationDate: '03/30',
    securityCode: '737',
    tarjetaName: 'Automation Test User'
  };

  orderPizzaPage.clickOnMenuCarta();
  orderPizzaPage.clickOnPizzaOption();
  orderPizzaPage.selectYourPizza('Alabama Pulled Pork');
  orderPizzaPage.editYourPizza('Alabama Pulled Pork');
  orderPizzaPage.clickOnAddPizza();
  orderPizzaPage.clickOnContinue();
  orderPizzaPage.validatePizzaIsOnShoppingCart('Alabama Pulled Pork');
  orderPizzaPage.clickOnContinuarCheckout();
  orderPizzaPage.chooseThePaymentMethod('Bizum');
  orderPizzaPage.clickOnPagarYFinalizar();
  orderPizzaPage.fillInTheCardCredentials(cardCredentials);
  orderPizzaPage.clickOnPagar();
  orderPizzaPage.validateThePizzaIsBeingPrepared();
  orderPizzaPage.validateThePizzaPriceOnTheTrackerPage();
  orderPizzaPage.validateThePizzaNameOnTheTrackerPage();
  I.saveScreenshot("pizzaOrderedPage.png");
}); 
