const editUserPage = require("../../pages/editUserPage/userProfilePage");
const loginAccountPage = require("../../pages/accessPage/loginAccountPage");

Feature("Editing the User details");

Before(async ({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.clickOnIniciarSesion();
  loginAccountPage.fillTheLoginCredentials({
    email: "lucas.mazzuco+3@ciandt.com",
    password: "Alsea@2020"});
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyIfUserWasLogged("Hola");
});

Scenario("Editing the User Details", ({ I }) => {
  editUserPage.clickOnTheUserAccount("Hola");
  editUserPage.clickOnEditMyProfileButton();
  editUserPage.clickOnEditTheAccountDetails();
  editUserPage.fillTheEditUserDetailsFilds();
  editUserPage.clickOnSaveChanges();
  editUserPage.checkNameUpdated();
  I.saveScreenshot("UserEdited.png");
});
