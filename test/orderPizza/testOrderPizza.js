
const orderAPizzaPage = require("../../pages/orderAPizzaPage/orderAPizzaPage");
const loginAccountPage = require("../../pages/accessPage/loginAccountPage");

Feature('Ordering a Pizza');

BeforeEach(({ I }) => {
  loginAccountPage.openLoginPage();
  loginAccountPage.fillTheLoginCredentials('automationuser@gmail.com', 'User@12345678');
  loginAccountPage.clickOnTheStartSession();
  loginAccountPage.verifyIfUserWasLogged('User');
  
  });

Scenario("Order a pizza", ({ I }) => {
  
  I.saveScreenshot("UserAccountCreated.png");
}); 
