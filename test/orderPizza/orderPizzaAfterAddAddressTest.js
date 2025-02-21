const loginAccountPage = require("../../pages/accessPage/loginAccountPage");
const orderPizzaPage = require("../../pages/orderPizzaPage/orderPizzaPage").default;
const addTheNewAddressPage = require("../../pages/accessPage/addNewAddressPage");
const userProfilePage = require("../../pages/editUserPage/userProfilePage");

const pizzaName = 'Alabama Pulled Pork';

Feature("Ordering a Pizza");

Before(async ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.clickOnIniciarSesion();
  loginAccountPage.fillTheLoginCredentials({ email: "lucas.mazzuco+3@ciandt.com", password: "Alsea@2020"});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyIfUserWasLogged("Hola");
});

xScenario("Ordering a pizza after the first access", async ({ I }) => {
  const cardCredentials = {
    number: '4111-1111-1111-1111',
    expirationDate: '03/30',
    securityCode: '737',
    tarjetaName: 'Automation Test User'
  };

  addTheNewAddressPage.clickOnPedirOnline();
  addTheNewAddressPage.addTheNewAddress("Calle De Formigal 1, 28024, Madrid, Madrid");
  addTheNewAddressPage.clickOnSearchAddressButton();
  addTheNewAddressPage.clickOnCompletarDireccion();
  addTheNewAddressPage.clickOnConfirmarAddress();
  addTheNewAddressPage.clickOnCloseTheModalDireccionGuardada();
  addTheNewAddressPage.clickOnNoGraciasModal();

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
  I.saveScreenshot("pizzaOrderedPage.png");
});

After(async ({ I }) => {
  userProfilePage.clickOnTheUserAccount("Hola");
  userProfilePage.clickOnEditMyProfileButton();
  userProfilePage.clickOnEliminarAddress(0);
  userProfilePage.clickOnConfirmarAddressDeletion();
  I.say("Test completed! Closing the Brownser...");
});