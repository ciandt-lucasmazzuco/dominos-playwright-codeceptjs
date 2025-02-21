const { I } = inject();

const locators = {
  userWasLogged: ".js-loggedInUserName",
  btnEditMyProfile: '[data-quid="profile-settings-view-edit"]',
  lblUserLogged: (userNameAccount) =>
    `span.js-loggedInUserName.nav__group--profile--name:has-text("${userNameAccount}")`,

  btnEditTheAccountDetails: '[data-quid="button-edit-personal-info"]',
  lblEditarMisDatos: "#dialogHeader",
  fieldFirstName: () => "#First_Name",
  btnGuardar: "button.js-profileSubmit",
  lblUserNameUpdated: '#js-customerPage',

  btnEliminarAddress: (addressIndex) =>
    `[data-quid="delete-address-${addressIndex}"]`,
  btnConfirmarAddressDeletion: 'a.js-continue',
  btnAddNewAddress: '[data-quid="add-entry"]',

};

const generateSimpleSuffix = () => {
  return Math.random().toString(36).substring(2, 7);
};

class EditUserPage {
  newName = "";

  clickOnTheUserAccount(userNameAccount) {
    I.waitForElement(locators.lblUserLogged(userNameAccount), 30);
    I.seeElement(locators.lblUserLogged(userNameAccount));
    I.click(locators.lblUserLogged(userNameAccount));

    I.waitForElement(locators.btnEditMyProfile, 30);
    I.seeElement(locators.btnEditMyProfile);
  }

  clickOnEditMyProfileButton() {
    I.click(locators.btnEditMyProfile);
  }

  clickOnEditTheAccountDetails() {
    I.waitForElement(locators.btnEditTheAccountDetails, 30);
    I.click(locators.btnEditTheAccountDetails);

    I.waitForElement(locators.lblEditarMisDatos, 30);
    I.seeElement(locators.lblEditarMisDatos);
  }

  fillTheEditUserDetailsFilds(baseName = "Automation Test User") {
    const newName = `${baseName} ${generateSimpleSuffix()}`;
    I.fillField(locators.fieldFirstName(), newName);
  
    this.newName = newName;
    return this;
  }

  clickOnSaveChanges() {
    I.click(locators.btnGuardar);
  }

  async checkNameUpdated() {
    I.waitForElement(locators.lblUserNameUpdated, 30);
    I.seeElementInDOM(locators.lblUserNameUpdated);

    const txtNameUpdated = await I.grabTextFrom(locators.lblUserNameUpdated);
    I.assertEqual(this.newName.trim(), txtNameUpdated.trim());

  }

  async clickOnEliminarAddress(addressIndex) {
    I.waitForElement(locators.btnEliminarAddress(addressIndex), 30);
    I.seeElement(locators.btnEliminarAddress(addressIndex));
    I.click(locators.btnEliminarAddress(addressIndex));

    I.waitForElement(locators.btnConfirmarAddressDeletion, 30);
    I.seeElement(locators.btnConfirmarAddressDeletion);
  }

  clickOnConfirmarAddressDeletion() {
    I.click(locators.btnConfirmarAddressDeletion);

    I.waitForElement(locators.btnAddNewAddress, 30);
    I.seeElement(locators.btnAddNewAddress);
  }
}

module.exports = new EditUserPage();
