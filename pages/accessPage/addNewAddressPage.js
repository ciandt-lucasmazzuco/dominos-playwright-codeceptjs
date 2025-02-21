const { I } = inject();

const locators = {
  fieldImputTheAddress: () => "#cityFinder",
  btnSearchAddress: '.js-searchboxButton',
  btnCompletarDireccion:
    'button.px-5.fs-1_4[data-dpz-no-track="true"]:has-text("Completar dirección")',
  btnConfirmarAddress:
    'button.px-5.fs-1_4[data-dpz-no-track="true"][type="submit"]:has-text("Confirmar")',
  txtDireccionGuardada: "#dialogHeader",
  btnCloseThePopUpDireccionGuardada: '[data-quid="generic-overlay-close"]',
  btnUserAccount: ".js-loggedInUserName", 
  lblUserLogged: (userNameAccount) => `span.js-loggedInUserName.nav__group--profile--name:has-text("${userNameAccount}")`,
  btnEditMyProfile: '[data-quid="profile-settings-view-edit"]',
  btnEliminarAddress: (addressIndex) =>
    `[data-quid="delete-address-${addressIndex}"]`,
  btnConfirmarAddressDeletion: 'a.js-continue',
  btnAddNewAddress: '[data-quid="add-entry"]',
  btnADomicilio: '[data-quid="easy-order-locator-delivery"]',
  btnPedirOnline: '[data-quid="main-navigation-order-online"]',
};

class AddTheNewAddressPage {
  clickOnPedirOnline() {
    I.waitForElement(locators.btnPedirOnline, 30)
    I.click(locators.btnPedirOnline);

    I.waitForElement(locators.btnADomicilio, 30);
    I.seeElement(locators.btnADomicilio);
    I.click(locators.btnADomicilio);
  }

  addTheNewAddress(addressName) {
    I.waitForElement(locators.btnSearchAddress, 30);
    I.seeElement(locators.btnSearchAddress);
    I.wait(4);
    I.fillField(locators.fieldImputTheAddress(), addressName);
  }

  clickOnSearchAddressButton() {
    I.click(locators.btnSearchAddress);
    I.wait(2);
  }

  clickOnCompletarDireccion() {
    I.click(locators.btnCompletarDireccion);
  }

  clickOnConfirmarAddress() {
    I.waitForElement(locators.btnConfirmarAddress, 30);
    I.seeElement(locators.btnConfirmarAddress);
    I.click(locators.btnConfirmarAddress);
  }

  async clickOnCloseTheModalDireccionGuardada() {
    I.waitForElement(locators.txtDireccionGuardada, 30);
    I.seeElement(locators.txtDireccionGuardada);
    I.click(locators.btnCloseThePopUpDireccionGuardada);
  }

  async clickOnNoGraciasModal() {
    I.checkTheModalVerPromos();
  }

  // async clickOnEliminarAddress(addressIndex) {
  //   I.waitForElement(locators.btnEliminarAddress(addressIndex), 30);
  //   I.seeElement(locators.btnEliminarAddress(addressIndex));
  //   I.click(locators.btnEliminarAddress(addressIndex));

  //   I.waitForElement(locators.btnConfirmarAddressDeletion, 30);
  //   I.seeElement(locators.btnConfirmarAddressDeletion);
  // }

  // clickOnConfirmarAddressDeletion() {
  //   I.click(locators.btnConfirmarAddressDeletion);

  //   I.waitForElement(locators.btnAddNewAddress, 30);
  //   I.seeElement(locators.btnAddNewAddress);
  // }
}

module.exports = new AddTheNewAddressPage();
