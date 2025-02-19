const { I } = inject();

const locators = {
  btnClickOnTheProfile: (userName) => ({role: "link", name: `${userName} - visita perfil`}),
  txtUserName: (userName) => ({
    xpath: `//*[contains(text(), "${userName} Test")]`,
}),
  btnFirstEdit: { xpath: '//p[contains(text(), "Revisa y administra tu")]//a' },
  txtTuInformacionLink: { xpath: '//*[text()="Tu Información"]' },
  btnSecondEdit: { role: "link", name: "Editar" },
  fieldName: { role: "textbox", name: "Nombre(s):" },
  btnSaveProfile: { role: "button", name: "Guardar" },
  txtUserNameEdited: (userNameEdited) => ({
    xpath: `//*[contains(text(), "${userNameEdited}")]`,
  }),
};

class EditUserPage {
  openEditUserDetails(userName) {
    I.click(locators.btnClickOnTheProfile(userName));
    I.waitForElement(locators.txtUserName, 10);
    I.see(locators.txtUserName);
  }

  clickOnEditProfile() {
    I.click(locators.btnFirstEdit);
    I.waitForElement(locators.btnSecondEdit, 10);
  }

  clickOnEditProfileSecondStage() {
    I.click(locators.btnSecondEdit);
    I.waitForElement(locators.fieldName, 10);
  }

  filTheEditUserDetailsFilds(newName) {
    I.fillField(locators.fieldName, newName);
  }

  clickOnSaveChanges() {
    I.click(locators.btnSaveProfile);
  }

  validateTheNameEdited() {
    I.waitForElement(locators.txtUserNameEdited, 10);
    I.see(newName, locators.txtUserNameEdited);
  }
}

module.exports = new EditUserPage();