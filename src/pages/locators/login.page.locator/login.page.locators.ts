export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const LoginPageLocators: Readonly<{
    readonly usernameInput: LocatorDefinition;
    readonly loginButton: LocatorDefinition;
    readonly mpulseLogo: LocatorDefinition;
    readonly selectDatabaseHeader: LocatorDefinition;
    readonly continueButton: LocatorDefinition;
    readonly getDatabaseRowSelector: (dbName: string) => string;
}> = {
    usernameInput: { selector: '#userName', name: 'Username Input' },
    loginButton: { selector: '#loginFormSubmit', name: 'Login Button' },
    mpulseLogo: { selector: "//div[@class='loginLogo']", name: 'MPulse Logo' },
    selectDatabaseHeader: { selector: "//h4[text()='Select Database']", name: 'Select Database Header' },
    continueButton: { selector: "//button[@value='Submit']", name: 'Continue Button' },
    getDatabaseRowSelector: (dbName: string): string =>
        `//tr[contains(@ng-click, 'dbSelectionChange') and .//td[contains(., '${dbName}')]]`
};
