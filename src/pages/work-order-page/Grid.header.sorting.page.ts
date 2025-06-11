import { Page } from "@playwright/test";
import { WebActions } from "../../base/web.action.util";
import { getPage } from "../../base/base";
import { timeouts } from "../../helper/timeouts-config";

class GridPage {

  private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }
    
    private Elements = {
        SortingwobyID: { selector: '//td[@aria-label="Column ID#"]//span[@class="dx-sort dx-sort-up"]', name: 'sort workorder by id' },
        beforewoID: { selector: "(//div[@class='gridContainer dx-widget dx-visibility-change-handler']//td/div)[14]", name: 'first workID' },
        sideBarExpander: { selector: "[class='sideBarExpander']", name: "Sidebar Expander" },
        maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" }
    };

    public async getCurrentWorkOrderIdText(): Promise<string> {
        const beforesortedwoID = this.actions.getLocator(this.Elements.beforewoID.selector);
        return await this.actions.getText(beforesortedwoID, this.Elements.beforewoID.name);
    }

    public async clickOnSideBarExpander(): Promise<void> {
        const sideBarExpander = this.actions.getLocator(this.Elements.sideBarExpander.selector);
        await this.actions.click(sideBarExpander, this.Elements.sideBarExpander.name);
    }

    public async clickOnMaximizeButton(): Promise<void> {
        const maximizeButton = this.actions.getLocator(this.Elements.maximizeButton.selector);
        await this.actions.click(maximizeButton, this.Elements.maximizeButton.name);
    }

    public async clickColumnHeader(): Promise<void> {
        const sortbyid = this.actions.getLocator(this.Elements.SortingwobyID.selector);
        await this.actions.click(sortbyid, this.Elements.SortingwobyID.name);
        await this.currentPage.waitForTimeout(timeouts.large);
    }

    public async verifySortedWorkOrderId(beforesortedText: string): Promise<void> {
        const afteresortedwoID = this.actions.getLocator(this.Elements.beforewoID.selector);
        const aftereSortedwoID = await this.actions.getText(afteresortedwoID, this.Elements.beforewoID.name);
        await this.actions.assertNotEqual(aftereSortedwoID, beforesortedText);
    }
}

export const gridPage = new GridPage();
