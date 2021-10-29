import { browser, by, element } from 'protractor';

export class AppPage {
<<<<<<< HEAD
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
=======
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
>>>>>>> dc0aaaea64640a6faba59a69dd89d418c1196366
  }
}
