import { Given, Then, When } from '@cucumber/cucumber';
import testData from '../../../data/testData.json';
import * as path from 'path';
import { loginPage } from '../../../pages/login-page/Login.page';
import { buildingRecordsPage } from '../../../pages/capital-assets-page/Building.records.page';
import { generatedBuildingTaskDescription } from '../../../helper/get.different.description';
import { homePage } from '../../../pages/home-page/Home.page';


const filePath = path.resolve(__dirname, '../../../data/docs/MPulse.docx');

When('the user accesses the Building Records section', async function () {
    await homePage.navigateToCapitalAssetsRecordsPage(
        testData.homePageURL,
        testData.element_text.got_it_btn,
        testData.menuItemTitle,
        testData.buildingMenueText,
        testData.buildingRecordsPageURL
    );
});

When('the user creates a new asset with a unique description and uploads media file', async function () {
    await buildingRecordsPage.createTaskWithMediaUpload(
        testData.icons.plusIcon,
        generatedBuildingTaskDescription,
        testData.element_text.media_text,
        testData.icons.media_link_icon,
        filePath
    );
});

Then('the user deletes the created building record', async function () {
    await buildingRecordsPage.deleteBuildingRecord(
        testData.icons.crossIcon,
        testData.element_text.continue_button_text
      );
});
