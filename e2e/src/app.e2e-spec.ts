<<<<<<< HEAD
import { browser, logging } from 'protractor';
import { AppPage } from './app.po';
=======
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
>>>>>>> dc0aaaea64640a6faba59a69dd89d418c1196366

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

<<<<<<< HEAD
  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('AsaderoFrontEndv2-dev app is running!');
=======
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('SistemaVentasApp app is running!');
>>>>>>> dc0aaaea64640a6faba59a69dd89d418c1196366
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
