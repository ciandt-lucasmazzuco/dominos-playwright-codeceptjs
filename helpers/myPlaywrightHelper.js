const Helper = require('@codeceptjs/helper');

class MyPlaywrightHelper extends Helper {
  async denyGeolocationPermission() {
    const { page } = this.helpers.Playwright; 
    const context = page.context();

    await context.clearCookies();
    console.log("Cookies successfully cleared!");
    
    await context.grantPermissions([], { origin: 'https://www-alsea.preprod.golo03.dominos.com' });

    console.log("Geolocation permission successfully denied!");
  }
}

module.exports = MyPlaywrightHelper;
