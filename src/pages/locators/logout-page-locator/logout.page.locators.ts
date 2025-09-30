export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const LogoutPageLocators: Readonly<{
    readonly toggleUserDetails: LocatorDefinition;
    readonly logoutButton: LocatorDefinition;
    readonly buildLink: LocatorDefinition;
}> = {
    toggleUserDetails: { selector: '//div[@ng-click="toggleUserDetails()"]', name: 'Toggle User Details' },
    logoutButton: { selector: '//li[text()="Logout"]', name: 'Logout Button' },
    buildLink: { selector: "//a[@ng-click='openBuild()']", name: 'Build Link' }
};
