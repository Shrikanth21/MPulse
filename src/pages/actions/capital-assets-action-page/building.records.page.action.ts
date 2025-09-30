import { Page } from '@playwright/test';
import { getPage } from '../../../base/base';
import { WebActions } from '../../../base/web.action.util';
import { commonPageActions } from '../common.page.actions';

class BuildingRecordsPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    /**
     * Deletes a building record by clicking on the cross icon and confirming the action.
     * @param crossIconTitle The title of the cross icon to click.
     * @param continueButtonText The text of the continue button to confirm deletion.
     */
    public async deleteBuildingRecord(crossIconTitle: string, continueButtonText: string): Promise<void> {
        await commonPageActions.clickLinkByTitle(crossIconTitle);
        await commonPageActions.clickSpanByText(continueButtonText);
    }
}

export const buildingRecordsPage = new BuildingRecordsPage();
