export enum enumFulfillmentTab {
    All = "",
    FBA = "AFN",
    FBM = "MFN"
}

export const fulfillmentTabLabels: {
    [enumFulfillmentTab.All]: string;
    [enumFulfillmentTab.FBM]: string;
    [enumFulfillmentTab.FBA]: string
} = {
    [enumFulfillmentTab.All]: "All",
    [enumFulfillmentTab.FBA]: "FBA",
    [enumFulfillmentTab.FBM]: "FBM"
};
