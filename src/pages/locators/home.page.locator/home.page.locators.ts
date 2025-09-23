export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const HomePageLocators: Readonly<{
    readonly sideMenuIcon: LocatorDefinition;
    readonly getCustomizationMenuByTitle: (title: string) => string;
}> = {
    sideMenuIcon: { selector: "[ui-view='sideMenu']", name: "Side Menu Icon" },
    getCustomizationMenuByTitle: (title: string) =>
        `//div[contains(@class,'siteMainNavSubLists')]//a[@title='${title}']`
};
