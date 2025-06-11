import { Then, When } from "@cucumber/cucumber";
import logger from "../../../helper/loggs/logger";
import { deleteWOPage } from "../../../pages/work-order-page/Delete.Wko.page";

let currentRecord: string;

When('the user click on delete current Record', async () => {
    currentRecord = await deleteWOPage.getCurrentWorkOrderIdText();
    await deleteWOPage.deletecurrentwo();
});

Then(/^the Work Order record should be deleted successfully$/, async () => {
    await deleteWOPage.verifyDeletedWOId(currentRecord);
    logger.info("Current Work Order deleted Successfully");
});
