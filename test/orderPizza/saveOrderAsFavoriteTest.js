const loginAccountPage = require("../../pages/accessPage/loginAccountPage");
const orderPizzaPage = require("../../pages/orderPizzaPage/orderPizzaPage").default;
const favoriteOrderPage = require("../../pages/orderPizzaPage/favoriteOrderPage").default;

const cardCredentials = {
  number: "4111-1111-1111-1111",
  expirationDate: "03/30",
  securityCode: "737",
  tarjetaName: "Automation Test User",
};

const pizzaName = 'Alabama Pulled Pork';

Feature("Ordering a Pizza");

Before(async ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.clickOnIniciarSesion();
  loginAccountPage.fillTheLoginCredentials({
    email: "beatrizfc+20@ciandt.com",
    password: "Alsea@2020"});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyIfUserWasLogged("Hola");
});

Scenario("Favorite the order through the checkout page", async ({ I }) => {
  orderPizzaPage.clickOnMenuCarta();
  orderPizzaPage.clickOnPizzaOption();
  orderPizzaPage.selectYourPizza(pizzaName);
  orderPizzaPage.editYourPizza(pizzaName);
  orderPizzaPage.clickOnAddPizza();
  orderPizzaPage.clickOnContinue();
  orderPizzaPage.validatePizzaIsOnShoppingCart(pizzaName);
  orderPizzaPage.clickOnContinuarCheckout();
  orderPizzaPage.chooseThePaymentMethod("Bizum");

  favoriteOrderPage.clickOnCheckBoxGuardarPedido();

  orderPizzaPage.clickOnPagarYFinalizar();
  orderPizzaPage.fillInTheCardCredentials(cardCredentials);
  orderPizzaPage.clickOnPagar();
  orderPizzaPage.validateThePizzaIsBeingPrepared();
  orderPizzaPage.validateThePizzaPriceOnTheTrackerPage();
  orderPizzaPage.validateThePizzaNameOnTheTrackerPage();

  orderPizzaPage.clickOnHomeButton();
  favoriteOrderPage.quitarOrdenFavorita();
  favoriteOrderPage.checkTheresNoFavoriteOrder();
  I.saveScreenshot("pizzaOrderedPage.png");
});

Scenario("Favorite the order through the tracker page", async ({ I }) => {
  orderPizzaPage.clickOnMenuCarta();
  orderPizzaPage.clickOnPizzaOption();
  orderPizzaPage.selectYourPizza(pizzaName);
  orderPizzaPage.editYourPizza(pizzaName);
  orderPizzaPage.clickOnAddPizza();
  orderPizzaPage.clickOnContinue();
  orderPizzaPage.validatePizzaIsOnShoppingCart(pizzaName);
  orderPizzaPage.clickOnContinuarCheckout();
  orderPizzaPage.chooseThePaymentMethod("Bizum");
  orderPizzaPage.clickOnPagarYFinalizar();
  orderPizzaPage.fillInTheCardCredentials(cardCredentials);
  orderPizzaPage.clickOnPagar();
  orderPizzaPage.validateThePizzaIsBeingPrepared();
  orderPizzaPage.validateThePizzaPriceOnTheTrackerPage();
  orderPizzaPage.validateThePizzaNameOnTheTrackerPage();

  favoriteOrderPage.clickOnGuardarPedidoTrackerPage();

  orderPizzaPage.clickOnHomeButton();
  favoriteOrderPage.quitarOrdenFavorita();
  favoriteOrderPage.checkTheresNoFavoriteOrder();
  I.saveScreenshot("pizzaOrderedPage.png");
});

Scenario("Favorite the order through the home page", async ({ I }) => {
  orderPizzaPage.clickOnMenuCarta();
  orderPizzaPage.clickOnPizzaOption();
  orderPizzaPage.selectYourPizza(pizzaName);
  orderPizzaPage.editYourPizza(pizzaName);
  orderPizzaPage.clickOnAddPizza();
  orderPizzaPage.clickOnContinue();
  orderPizzaPage.validatePizzaIsOnShoppingCart(pizzaName);
  orderPizzaPage.clickOnContinuarCheckout();
  orderPizzaPage.chooseThePaymentMethod("Bizum");
  orderPizzaPage.clickOnPagarYFinalizar();
  orderPizzaPage.fillInTheCardCredentials(cardCredentials);
  orderPizzaPage.clickOnPagar();
  orderPizzaPage.validateThePizzaIsBeingPrepared();
  orderPizzaPage.validateThePizzaPriceOnTheTrackerPage();
  orderPizzaPage.validateThePizzaNameOnTheTrackerPage();
  orderPizzaPage.clickOnHomeButton();

  favoriteOrderPage.clickOnGuardarPedidoHomePage();
  favoriteOrderPage.fillinTheFavoriteOrderName('My Favorite Order');
  favoriteOrderPage.clickOnGuardarPedidoHomePage();
  favoriteOrderPage.checkTheFavoriteOrderSaved(); // ta estranho
  favoriteOrderPage.quitarOrdenFavorita();
  favoriteOrderPage.checkTheresNoFavoriteOrder();
  I.saveScreenshot("favoriteOrderCreated.png");
});