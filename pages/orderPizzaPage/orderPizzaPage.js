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
  txtPizzaAddedToCart: 'a[id^="variant_"]',
  btnContinueCheckout: 'a[data-quid="continue-checkout-btn"]',
  btnVerPromos: '//button[contains(text(), "Ver Promos")]',
  btnContinuarPopUpVerPromos: '//button[contains(text(), "Continuar")]',
  btnContinuarElPedido: 'a[data-quid="continue-checkout-btn"]',
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
};

class OrderAPizzaPage {
  priceOnShoppingCart = "";
  pizzaAddedToCart = "";

  clickOnMenuCarta() {
    I.click(locators.btnMenuCarta);
    I.waitForElement(locators.pizzaOption, 30);
    I.seeInField(locators.pizzaOption, "Pizzas");
  }

  clickOnPizzaOption() {
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

  clickOnAddPizza() {
    I.waitForElement(locators.btnAddPizza, 30);
    I.click(locators.btnAddPizza);
  }

  async clickOnContinue() {
    I.waitForElement(locators.btnContinuarToOrderPizza, 30);
    I.click(locators.btnContinuarToOrderPizza);
    I.waitForElement(locators.txtCarrito, 30);
    I.see("CARRITO", locators.txtCarrito);

    this.priceOnShoppingCart = await I.grabTextFrom("td.price");
    return this.priceOnShoppingCart;
  }

  validatePizzaIsOnShoppingCart(pizzaName) {
    I.waitForElement(locators.txtPizzaAddedToCart, 30);

    I.grabTextFrom(locators.txtPizzaAddedToCart).then((pizzaAddedToCart) => {
      I.see(pizzaName, pizzaAddedToCart);
    });
    I.say(`The pizza "${pizzaName}" is being displayed on the cart!`);
  }
  getPizzaAddedToCart() {
    return pizzaAddedToCart;
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
    I.scrollTo(locators.btnPagarYFinalizar);
    I.waitForElement(locators.btnPagarYFinalizar, 30);

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
    I.waitForElement(locators.btnPagar, 30);

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
    I.see(locators.pizzaPriceOnTrackerPage);
  }

  async validateThePizzaPriceOnTheTrackerPage() {
    const priceCheckoutPage = await I.grabTextFrom(
      locators.pizzaPriceOnTrackerPage);
    Assertion.assert(this.priceOnShoppingCart === priceCheckoutPage,
      `The prices didn't match. On the Shopping Cart: ${this.priceOnShoppingCart}, On the Checkout Page: ${priceCheckoutPage}`
    );
  }
  
  async validateThePizzaNameOnTheTrackerPage() {
    const pizzaNameOnCheckout = await I.grabTextFrom(locators.txtPizzaNameOnCheckout);
    Assertion.assert(this.pizzaAddedToCart === pizzaNameOnCheckout,
      `Pizza on the shooping cart (${this.pizzaAddedToCart}) does not match the pizza on the checkout page: (${pizzaNameOnCheckout})`
    );
  }
}

export default new OrderAPizzaPage();
