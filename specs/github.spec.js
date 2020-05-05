const { chromium } = require('playwright');
const expect = require('chai').expect;

const BASE_URL = 'https://github.com/microsoft/playwright';

describe('Some playwright test', () => {

  before(async () => {
    browser = await chromium.launch();
    context = await browser.newContext({viewport: {
      width: 1280,
      height: 1024
    }});
    page = await context.newPage();
  });

  after(async function() {
    await page.screenshot({ path: `./screenshots/${this.currentTest.title.replace(/\s+/g, '_')}.png` })
    await browser.close()
  });

  it('checks page title', async () => {
    await page.goto(BASE_URL);
    expect(await page.title()).to.equal('GitHub - microsoft/playwright: Node library to automate Chromium, Firefox and WebKit with a single API');
  });

  it('opens "Issues" page', async () => {
    const selector = 'li:nth-of-type(2) > .reponav-item';
    await page.waitForSelector(selector);
    await page.click(selector);
    expect(await page.title()).to.equal('Issues · microsoft/playwright · GitHub');
  });

})
