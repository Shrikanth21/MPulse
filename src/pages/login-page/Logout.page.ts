import { Page } from "@playwright/test";
import { WebActions } from "../../base/web.action.util";
import { getPage } from "../../base/base";
import * as fs from "fs";
import { resolve } from "path";

class LogoutPage {
    private get currentPage(): Page {
        return getPage();
    }

    private get actions(): WebActions {
        return new WebActions(this.currentPage);
    }

    private Elements = {
        toggleUserDetails: { selector: '//div[@ng-click="toggleUserDetails()"]', name: 'toggle User Details' },
        logoutButton: { selector: '//li[text()="Logout"]', name: 'Logout Button' },
        loginButton: { selector: '#loginFormSubmit', name: 'Login Button' },
        buildLink: { selector: "//a[@ng-click='openBuild()']", name: 'Build Link' },
    };

    /**
     * Logs out the user and writes the build link to a file.
     */
    public async logout(): Promise<void> {
        this.writeBuildLinkToFile();
        const toggleUserBtn = this.actions.getLocator(this.Elements.toggleUserDetails.selector);
        await this.actions.click(toggleUserBtn, this.Elements.toggleUserDetails.name);
        const logoutBtn = this.actions.getLocator(this.Elements.logoutButton.selector);
        await this.actions.click(logoutBtn, this.Elements.logoutButton.name);
        await this.actions.waitForElementToBeVisible(this.actions.getLocator(this.Elements.loginButton.selector), this.Elements.loginButton.name);
    }

    /**
     * Retrieves the text of the build link.
     * @returns The text of the build link.
     */
    public async getBuildLinkText(): Promise<string> {
    const buildLinkLocator = this.actions.getLocator(this.Elements.buildLink.selector);
    const text = await buildLinkLocator.textContent();
    return text?.trim() ?? '';
  }

    /**
     * Writes the build link text to a JSON file.
     */
  public async writeBuildLinkToFile(): Promise<void> {
    const filePath = resolve(__dirname, '../../data/build-link.json');
    const buildLinkText = await this.getBuildLinkText();
    fs.writeFileSync(filePath, JSON.stringify({ buildLinkText }, null, 2));
  }
}

export const logoutPage = new LogoutPage();
