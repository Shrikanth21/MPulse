import dotenv from 'dotenv';
import reporter from 'cucumber-html-reporter';
import testData from '../data/testData.json';
import build from '../data/build-link.json';

dotenv.config({
  path: `${process.cwd()}/config/.env.${process.env.environment ?? 'qa'}`
});

const options = {
  theme: "bootstrap" as "bootstrap",
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report_bootstrap.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  columnLayout: 1,
  screenshotsDirectory: 'reports/',
  failedSummaryReport: true,
  logo: 'assets/mpulse-logo.png',
  brandTitle: 'MPulse QA Automation',
  name: 'MPulse Cucumber Report',
  pageTitle: 'MPulse Cucumber Report',
  metadata: {
    browser: process.env.browser ?? '<span style="color: #a72828ff; font-weight: bold;">chrome</span>',
    app_url: `<span style="color: #a72e28ff; font-weight: bold;">${process.env.app_url!}</span>`,
    environment: process.env.environment ?? '<span style="color: #a73328ff; font-weight: bold;">QA</span>',
    platform: process.env.platform ?? '<span style="color: #a73528ff; font-weight: bold;">web</span>',
    dataBase: `<span style="color: #a72828ff; font-weight: bold;">${testData.db_name}</span>`,
    executionDate: `<span style="color: #a73b28ff; font-weight: bold;">${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span>`,
    version: `<span style="color: #a73f28ff; font-weight: bold;">${build.buildLinkText}</span>`,
    testType: `<span style="color: #a72828ff; font-weight: bold;">${process.env.test_type ?? 'Sanity'}</span>`,
  }
};

function generateHtmlReport() {
  reporter.generate(options);
}

generateHtmlReport();
