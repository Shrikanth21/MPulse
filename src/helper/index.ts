import dotenv from "dotenv";
import reporter from "cucumber-html-reporter";
import testData from "../data/testData.json";
import build from "../data/build-link.json";
import fs from "fs";
import path from "path";

dotenv.config({
  path: `${process.cwd()}/config/.env.${process.env.environment ?? "qa"}`
});

const reportPath = path.resolve("reports/cucumber_report_bootstrap.html");

const options = {
  theme: "bootstrap" as "bootstrap",
  jsonFile: 'reports/cucumber_report.json',
  output: reportPath,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  columnLayout: 1,
  screenshotsDirectory: 'reports/',
  failedSummaryReport: true,
  metadata: {
    browser: `<span style="color: #a72828ff; font-weight: bold;">${process.env.browser}</span>`,
    app_url: `<span style="color: #a72e28ff; font-weight: bold;">${process.env.app_url}</span>`,
    environment: process.env.environment ?? '<span style="color: #a73328ff; font-weight: bold;">QA</span>',
    platform: process.env.platform ?? '<span style="color: #a73528ff; font-weight: bold;">web</span>',
    dataBase: `<span style="color: #a72828ff; font-weight: bold;">${testData.db_name}</span>`,
    executionDate: `<span style="color: #a73b28ff; font-weight: bold;">${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span>`,
    version: `<span style="color: #a73f28ff; font-weight: bold;">${build.buildLinkText}</span>`,
    testType: `<span style="color: #a72828ff; font-weight: bold;">${process.env.test_type ?? 'Sanity'}</span>`,
  }
};

reporter.generate(options);

if (fs.existsSync(reportPath)) {
  const html = fs.readFileSync(reportPath, "utf-8");
  const logoHTML = `
  <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px; padding: 0 20px;">
  <img src="https://dev.mpulse9.com//App_Themes/LOGO/logo.svg" class="img-responsive" alt="MPulse Logo" style="max-height: 80px;">
  <h1 style="margin: 0; font-size: 24px; color: #333; font-weight: bold;">MPulse Automation Report</h1>
</div>
  `;
  const updatedHtml = html.replace("<body>", `<body>\n${logoHTML}`);
  fs.writeFileSync(reportPath, updatedHtml, "utf-8");
} else {
  console.error("❌ Report file not found. Logo injection failed.");
}
