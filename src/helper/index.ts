import dotenv from 'dotenv';
import reporter from 'cucumber-html-reporter';
import testData from '../data/testData.json';

dotenv.config({
  path: `${process.cwd()}/config/.env.${process.env.environment ?? 'qa'}`
});

const options = {
  theme: "bootstrap" as "bootstrap",
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report_bootstrap.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  columnLayout: 1,
  screenshotsDirectory: 'reports/',
  failedSummaryReport: true,
  metadata: {
    browser: process.env.browser ?? 'chrome',
    app_url: process.env.app_url!,
    environment: process.env.environment ?? 'qa',
    platform: process.env.platform ?? 'web',
    dataBase: testData.db_name
  }
};

function generateHtmlReport() {
  reporter.generate(options);
}

generateHtmlReport();
