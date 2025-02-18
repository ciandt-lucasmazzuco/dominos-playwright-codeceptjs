const { I } = inject();
import { Assertion } from "chai";

const locators = {
  btnMenuCarta: '[data-quid="main-navigation-menu"]',
  pizzaOption: '[data-quid="entree-title-specialtypizza"]',
  btnClickOnPizzaOption: '[data-quid="entree-title-Pizza"]',
  selectThePizza: (pizzaName) =>
    `a.btn[data-dpz-track-evt-name="Customize CTA | ${pizzaName}"]`,
  addPizzaButton:
    'a.btn.media__btn.js-customize[data-dpz-track-evt-name^="Customize CTA"]',
  crearTuPizzaTitle: 'h1[data-quid="generic-card-overlay-title"]',
  btnAddPizza: 'button[data-quid="add-pizzabuilder-button"]',
  btnContinuarToOrderPizza: 'a[data-quid="order-checkout-button"]',
  txtCarrito: '[data-quid="cart-title"]',
  txtPizzaAddedToCart: "#variant_1",
  btnContinueCheckout: 'a[data-quid="continue-checkout-btn"]',
  btnVerPromos: 'button:has-text("Ver Promos")',
  btnContinuarPopUpVerPromos: 'button:has-text("Continuar")',
  btnContinuarElPedido: 'a[data-quid="continue-checkout-btn"]',

  btnTest: '.some-container button:has-text("Continuar")',

  txtPopUpOrderDetails: "#js-modalHeader",
  btnContinuarPopUpOrderDetails: ".js-sam-continue",
  lblPaymentForm: '[data-quid="payment-type-form"]',
  optPaymentWithDatafono: '[data-quid="payment-doordebit"]',
  optPaymentWithBizum: '[data-quid="payment-adyen3"]',
  btnPagarYFinalizar: '[data-quid="payment-order-now"]',
  fieldCardNumber: () => 'input[data-fieldtype="encryptedCardNumber"]',
  fieldExpirationDate: () => 'input[aria-label="Fecha de expiración"]',
  fieldSecurityCode: () => 'input[data-fieldtype="encryptedSecurityCode"]',
  fieldCardName: () => 'input[name="holderName"]',
  btnPagar: "button.adyen-checkout__button.adyen-checkout__button--pay",
  txtPizzaNameOnCheckout: ".order-summary__item__title",
  pizzaPriceOnTrackerPage: "td.price.itemDetails",
  btnNoGraciasFromAgregarTuOrdemPopUp: 'button:has-text("No, gracias")',
};

class OrderAPizzaPage {
  priceOnShoppingCart = "";
  pizzaAddedToCart = "";

  clickOnMenuCarta() {
    I.click(locators.btnMenuCarta);

    I.waitForElement(locators.btnNoGraciasFromAgregarTuOrdemPopUp, 30);
    I.seeElement(locators.btnNoGraciasFromAgregarTuOrdemPopUp);
    I.click(locators.btnNoGraciasFromAgregarTuOrdemPopUp);
  }

  clickOnPizzaOption() {
    I.waitForElement(locators.pizzaOption, 30);
    I.click(locators.pizzaOption);
    I.waitForElement(locators.addPizzaButton, 30);
    I.seeElement(locators.addPizzaButton);
  }

  selectYourPizza(pizzaName) {
    I.click(locators.selectThePizza(pizzaName));
  }

  editYourPizza(pizzaName) {
    I.waitForElement(locators.crearTuPizzaTitle, 30);
    I.see(
      `Crea tu Pizza ${pizzaName}`.toUpperCase(),
      locators.crearTuPizzaTitle
    );
  }

  async clickOnAddPizza() {
    I.waitForElement(locators.btnAddPizza, 30);
    I.seeElement(locators.btnAddPizza);
    I.click(locators.btnAddPizza);
    I.wait(2);
    I.click(locators.btnAddPizza);
  }

  async clickOnContinue() {
    I.waitForElement(locators.btnContinuarToOrderPizza, 30);
    I.seeElement(locators.btnContinuarToOrderPizza);
    I.click(locators.btnContinuarToOrderPizza);
    I.waitForElement(locators.txtCarrito, 30);
    I.see("CARRITO", locators.txtCarrito);

    this.priceOnShoppingCart = await I.grabTextFrom("td.price");
    return this.priceOnShoppingCart;
  }

  async validatePizzaIsOnShoppingCart(pizzaName) {
    I.waitForElement(locators.txtPizzaAddedToCart, 30);

    const pizzaAddedToCart = await I.grabTextFrom(locators.txtPizzaAddedToCart);
    I.assertEqual(pizzaAddedToCart.trim(), pizzaName.trim(), `Pizza names do not match. Expected: ${pizzaName}, Found: ${pizzaAddedToCart}`);

    this.pizzaAddedToCart = pizzaAddedToCart.trim();

    I.say(`The pizza "${pizzaName}" is being displayed on the cart!`);
  }

  clickOnContinuarCheckout() {
    I.click(locators.btnContinueCheckout);

    I.wait(1);

    if (I.seeElement(locators.btnVerPromos)) {
      I.click(locators.btnContinuarPopUpVerPromos);
      I.waitForElement(locators.txtPopUpOrderDetails, 30);
      I.click(locators.btnContinuarPopUpOrderDetails);
    } else {
      I.click(locators.btnContinuarElPedido);
    }
  }

  chooseThePaymentMethod(paymentMethod) {
    I.waitForElement(locators.btnPagarYFinalizar, 30);
    I.scrollTo(locators.btnPagarYFinalizar);

    if (paymentMethod == "Con datafono") {
      I.click(locators.optPaymentWithDatafono);
    } else if (paymentMethod == "Bizum") {
      I.click(locators.optPaymentWithBizum);
    }
  }

  clickOnPagarYFinalizar() {
    I.click(locators.btnPagarYFinalizar);
  }

  fillInTheCardCredentials(cardCredentials) {
    const { number, expirationDate, securityCode, tarjetaName } =
      cardCredentials;
    I.wait(5);

    I.switchTo('iframe[title="Utilice Iframe para el número de tarjeta"]');
    I.fillField(locators.fieldCardNumber(), number);
    I.switchTo();

    I.switchTo('iframe[title="Utilice iframe para la fecha de caducidad"]');
    I.fillField(locators.fieldExpirationDate(), expirationDate);
    I.switchTo();

    I.switchTo('iframe[title="Utilice iframe para el código de seguridad"]');
    I.fillField(locators.fieldSecurityCode(), securityCode);
    I.switchTo();

    I.fillField(locators.fieldCardName(), tarjetaName);
  }

  clickOnPagar() {
    I.click(locators.btnPagar);
  }

  async validateThePizzaIsBeingPrepared() {
    I.waitForElement(locators.pizzaPriceOnTrackerPage, 30);
    I.seeElement(locators.pizzaPriceOnTrackerPage);
  }

  async validateThePizzaPriceOnTheTrackerPage() {
    I.waitForElement(locators.pizzaPriceOnTrackerPage, 30);

    const priceCheckoutPage = await I.grabTextFrom(locators.pizzaPriceOnTrackerPage);

    I.assertEqual(priceCheckoutPage.replace(/[€\s]/g, "").trim(), this.priceOnShoppingCart.replace(/[€\s]/g, "").trim(),
      `Prices do not match. On checkout: ${cleanPriceCheckout}, In shopping cart: ${cleanPriceShoppingCart}`);
  }

  async validateThePizzaNameOnTheTrackerPage() {
    I.waitForElement(locators.txtPizzaNameOnCheckout, 30);
    const pizzaNameOnCheckout = await I.grabTextFrom(locators.txtPizzaNameOnCheckout);

    I.assertEqual(pizzaNameOnCheckout.trim(), this.pizzaAddedToCart.trim(),
    `Pizza names do not match. Expected: ${this.pizzaAddedToCart}, Found: ${pizzaNameOnCheckout}`);
  }
}

export default new OrderAPizzaPage();
