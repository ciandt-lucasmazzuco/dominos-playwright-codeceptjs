const Helper = require('@codeceptjs/helper');

class DebugHelper extends Helper {
  async pause() {
    // Pausa a execução do teste e espera por input do usuário
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
    // Loga uma mensagem com um prefixo de INFO
    console.log(`INFO: ${message}`);
  }

  async logDebug(message) {
    // Loga uma mensagem com um prefixo de DEBUG
    console.log(`DEBUG: ${message}`);
  }

  async getCurrentUrl() {
    // Obtém e loga a URL atual
    const helper = this.helpers['Playwright'] || this.helpers['WebDriver'];
    const url = await helper.grabCurrentUrl();
    console.log(`Current URL: ${url}`);
    return url;
  }

  async takeScreenshot(name) {
    // Tira um screenshot com um nome personalizado
    const helper = this.helpers['Playwright'] || this.helpers['WebDriver'];
    await helper.saveScreenshot(name);
    console.log(`Screenshot saved: ${name}`);
  }
}

module.exports = DebugHelper;