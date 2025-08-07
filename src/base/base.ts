import { setDefaultTimeout, Before, After, BeforeAll, AfterAll, Status, BeforeStep, AfterStep } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox } from 'playwright';
import dotenv from 'dotenv';
import logger, { setLoggerForScenario } from '../helper/loggs/logger';
import { logoutPage } from '../pages/login-page/Logout.page';

setDefaultTimeout(1000 * 60 * 2);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async () => {
  dotenv.config({
    path: `${process.cwd()}/config/.env.${process.env.environment ?? 'qa'}`
  });

  const browserType = process.env.browser ?? process.env.browser!;

  switch (browserType.toLowerCase()) {
    case 'chrome':
    case 'gc':
      browser = await chromium.launch({ headless: false, channel: 'chrome', args: ['--start-maximized'] });
      break;
    case 'firefox':
    case 'ff':
      browser = await firefox.launch({ headless: true, args: ['--start-maximized'] });
      break;
    case 'edge':
    case 'msedge':
      browser = await chromium.launch({ headless: true, channel: 'msedge', args: ['--start-maximized'] });
      break;
    default:
      throw new Error(`Invalid browser type "${browserType}" provided`);
  }
});

Before(async function (scenario) {
  const scenarioName = scenario.pickle?.name ?? 'UnknownScenario';
  this.logger = setLoggerForScenario(scenarioName.replace(/[^a-zA-Z0-9-_]/g, '_'));

  if (!browser) {
    browser = await chromium.launch({ headless: false });
  }
  context = await browser.newContext({
    viewport: null,
    javaScriptEnabled: true
  });
  page = await context.newPage();
  page.once('dialog', async dialog => {
    await dialog.accept();
  });
  this.page = page;
  await page.goto(process.env.app_url!);
});

After(async function () {
  try {
    await logoutPage.logout();
    logger.info('User logged out successfully');
  } catch (error) {
    logger.error('Error during logout:', error);
  }
  await this.page?.close();
  await this.context?.close();
});

BeforeStep(async function (step) {
  await this.attach(`Step started: ${step.pickleStep.text}`, 'text/plain');
});

AfterStep(async function (step) {
  if (step.result?.status === Status.FAILED) {
    const currentPage: Page = this.page;
    const screenshotBuffer = await currentPage.screenshot({ fullPage: true });
    await this.attach(screenshotBuffer, 'image/png');
  }

  await this.attach(`Step ended: ${step.pickleStep.text}`, 'text/plain');
});

AfterAll(async () => {
  await browser?.close();
});

export function getPage(): Page {
  return page;
}
