const Helper = require('@codeceptjs/helper');

class DebugHelper extends Helper {
  async pause() {
    console.log('Test paused. Press any key to continue...');
    return new Promise(resolve => {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        resolve();
      });
    });
  }

  async logInfo(message) {
    console.log(`INFO: ${message}`);
  }

  async logDebug(message) {
    console.log(`DEBUG: ${message}`);
  }

  async getCurrentUrl() {
    const helper = this.helpers['Playwright'] || this.helpers['WebDriver'];
    const url = await helper.grabCurrentUrl();
    console.log(`Current URL: ${url}`);
    return url;
  }

  async takeScreenshot(name) {
    const helper = this.helpers['Playwright'] || this.helpers['WebDriver'];
    await helper.saveScreenshot(name);
    console.log(`Screenshot saved: ${name}`);
  }
}

module.exports = DebugHelper;