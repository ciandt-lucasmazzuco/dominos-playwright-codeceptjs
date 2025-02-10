Feature('Editing the User details');

const editUserPage = require('../../pages/editUserPage/editUserPage');

Scenario('Editing the User Details', ({ I }) => {
    editUserPage.openEditUserDetails('lucas');
    editUserPage.clickOnEditProfile();
    editUserPage.clickOnEditProfileSecondStage();
    editUserPage.filTheEditUserDetailsFilds('Coan Mazzuco');
    editUserPage.clickOnSaveChanges();
    editUserPage.validateTheNameEdited('Coan Mazzuco');
    I.saveScreenshot('UserEdited.png');
});