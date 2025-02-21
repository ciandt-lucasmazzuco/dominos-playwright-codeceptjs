const { I } = inject();

const locators = {
  checkBoxFavoriteOrderFromCheckout: "#Easy_Order_Selection",
  btnGuardarPedidoTracker: 'button.js-addAsEasyOrder:has-text("Guardar pedido")',
  btnGuardarComoFavoritoHome: '[data-quid="order-history-recent-order-save-as-easy-order"]',
  fieldFavoriteOrderName: () => "#Easy_Order_Nickname",
  txtFavoriteOrderNameSaved: '[data-quid="easy-order-nickname"]',
  btnQuitarFavoriteOrder: '[data-quid="remove-easy-order"]',
  btnEliminarFavoriteOrder: 'button.js-continue:has-text("Si, eliminar")',
  btnCrearPedidoFavorito: '[data-quid="easy-order-create"]',
};

class FavoriteOrderPage {
  favoriteOrderName = "";

  clickOnCheckBoxGuardarPedido() {
    I.waitForElement(locators.checkBoxFavoriteOrderFromCheckout, 30);
    I.seeElement(locators.checkBoxFavoriteOrderFromCheckout);
    I.click(locators.checkBoxFavoriteOrderFromCheckout);
  }

  clickOnGuardarPedidoTrackerPage() {
    I.waitForElement(locators.btnGuardarPedidoTracker, 30);
    I.seeElement(locators.btnGuardarPedidoTracker);
    I.click(locators.btnGuardarPedidoTracker);
    I.wait(2);
  }

  clickOnGuardarPedidoHomePage() {
    I.waitForElement(locators.btnGuardarComoFavoritoHome, 30);
    I.seeElement(locators.btnGuardarComoFavoritoHome);
    I.click(locators.btnGuardarComoFavoritoHome);
  }

  fillinTheFavoriteOrderName(favoriteOrderName) {
    I.wait(1);
    I.fillField(locators.fieldFavoriteOrderName(), favoriteOrderName);

    this.favoriteOrderName = favoriteOrderName;
    return this;
  }

  async checkTheFavoriteOrderSaved() {
    I.wait(5);
    I.waitForEnabled(locators.txtFavoriteOrderNameSaved, 30);
    I.seeElementInDOM(locators.txtFavoriteOrderNameSaved);

    const favoriteOrderNameSaved = await I.grabTextFrom(locators.txtFavoriteOrderNameSaved);
    I.assertEqual(favoriteOrderNameSaved.trim(), this.favoriteOrderName.trim());
  }

  quitarOrdenFavorita() {
    I.waitForElement(locators.btnQuitarFavoriteOrder, 30);
    I.seeElement(locators.btnQuitarFavoriteOrder);
    I.click(locators.btnQuitarFavoriteOrder);

    I.waitForElement(locators.btnEliminarFavoriteOrder, 30);
    I.seeElement(locators.btnEliminarFavoriteOrder);
    I.click(locators.btnEliminarFavoriteOrder);
  }

  checkTheresNoFavoriteOrder() {
    I.waitForElement(locators.btnCrearPedidoFavorito, 30);
    I.seeElementInDOM(locators.btnCrearPedidoFavorito);
  }
}

export default new FavoriteOrderPage();
