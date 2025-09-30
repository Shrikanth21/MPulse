export type LocatorDefinition = {
    readonly selector: string;
    readonly name: string;
};

export const WkoGridHeaderSortingLocators: Readonly<{
    readonly sortingWorkOrderByID: LocatorDefinition;
    readonly beforeWorkOrderID: LocatorDefinition;
    readonly maximizeButton: LocatorDefinition;
    readonly sideBarCollapse: LocatorDefinition;
    readonly sortUpIcon: LocatorDefinition;
}> = {
    sortingWorkOrderByID: { selector: '//div[@dx-data-grid="listviewgrid"]/descendant::div[text()="ID#"]', name: 'sort workorder by id' },
    beforeWorkOrderID: { selector: "//td[contains(@aria-describedby,'dx-col') and @aria-colindex='2']", name: 'first workID' },
    maximizeButton: { selector: '[title="Maximize"]', name: "Maximize Button" },
    sideBarCollapse: { selector: "//div[@class='sideBarExOptions']//i[@class='fas fa-chevron-left']", name: "Sidebar Collapse Icon" },
    sortUpIcon: { selector: "//span[@class='dx-sort dx-sort-up']", name: "Sort Up Icon" },
};
