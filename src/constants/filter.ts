export const countryFilter = [
    { name: "United Kingdom", image: "/assets/flag/united-kingdom.svg" },
    { name: "France", image: "/assets/flag/france.svg" },
    { name: "Italy", image: "/assets/flag/italy.svg" },
    { name: "Netherlands", image: "/assets/flag/netherland.svg" },
    { name: "German", image: "/assets/flag/german.svg" },
    { name: "Spain", image: "/assets/flag/spain.svg" },
    { name: "Sweden", image: "/assets/flag/sweden.svg" },
    { name: "Poland", image: "/assets/flag/poland.svg" },
    { name: "Belgium", image: "/assets/flag/belgium.svg" },
    { name: "Turkey", image: "/assets/flag/turkey.svg" },
    { name: "Germany", image: "/assets/flag/germany.svg" },
]

export enum EnumOrderStatus {
    All = "",
    Pending = "Pending",
    Shipped = "Shipped",
    SellerInitiated = "Seller_Initiated",
    Canceled = "Canceled",
    Refunded = "Refunded",
    Replacement = "Replacement",
    Loss = "Loss",
    Removal = "Removal",
    Return = "Return",
    Disposal = "Disposal",
}

// Map Enum values to user-friendly labels
export const orderStatusLabels: {
    [EnumOrderStatus.All]: string;
    [EnumOrderStatus.Removal]: string;
    [EnumOrderStatus.Return]: string;
    [EnumOrderStatus.SellerInitiated]: string;
    [EnumOrderStatus.Loss]: string;
    [EnumOrderStatus.Shipped]: string;
    [EnumOrderStatus.Replacement]: string;
    [EnumOrderStatus.Canceled]: string;
    [EnumOrderStatus.Disposal]: string;
    [EnumOrderStatus.Pending]: string;
    [EnumOrderStatus.Refunded]: string
} = {
    [EnumOrderStatus.All]: "All Status",
    [EnumOrderStatus.Pending]: "Pending",
    [EnumOrderStatus.Shipped]: "Shipped",
    [EnumOrderStatus.SellerInitiated]: "Seller Initiated",
    [EnumOrderStatus.Canceled]: "Canceled",
    [EnumOrderStatus.Refunded]: "Refunded",
    [EnumOrderStatus.Replacement]: "Replacement",
    [EnumOrderStatus.Loss]: "Loss",
    [EnumOrderStatus.Removal]: "Removal",
    [EnumOrderStatus.Return]: "Return",
    [EnumOrderStatus.Disposal]: "Disposal",
};

// Convert Enum to an array for UI dropdowns
export const orderStatusList = Object.entries(orderStatusLabels).map(([value, name]) => ({
    name,
    value: value as EnumOrderStatus,
}));


export const inventoryStatusList = [
    { name: "All", value: "" },
    { name: "In Stock", value: "in_stock" },
    { name: "Out of Stock", value: "out_of_stock" },
    { name: "Inbound", value: "inbound" },
    { name: "Reserved", value: "reserved" },
    { name: "Unfulfillable", value: "unfulfillable" },
    { name: "No CoG", value: "no_cog" },
    { name: "Losers", value: "losers" },
    { name: "Deleted", value: "deleted" },
]

export enum EnumShipmentStatus {
    All = "",
    Working = "Working",
    ReadyToShip = "Ready to ship",
    Shipped = "Shipped",
    InTransit = "IN_TRANSIT",
    Delivered = "Delivered",
    CheckedIn = "Checked in",
    Receiving = "Receiving",
    Closed = "Closed",
    Cancelled = "Cancelled",
    Deleted = "Deleted",
}

export const shipmentStatusLabels: {
    [EnumShipmentStatus.All]: string;
    [EnumShipmentStatus.Working]: string;
    [EnumShipmentStatus.ReadyToShip]: string;
    [EnumShipmentStatus.Shipped]: string;
    [EnumShipmentStatus.InTransit]: string;
    [EnumShipmentStatus.Delivered]: string;
    [EnumShipmentStatus.CheckedIn]: string;
    [EnumShipmentStatus.Receiving]: string;
    [EnumShipmentStatus.Closed]: string;
    [EnumShipmentStatus.Cancelled]: string;
    [EnumShipmentStatus.Deleted]: string;
} = {
    [EnumShipmentStatus.All]: "All",
    [EnumShipmentStatus.Working]: "Working",
    [EnumShipmentStatus.ReadyToShip]: "Ready to ship",
    [EnumShipmentStatus.Shipped]: "Shipped",
    [EnumShipmentStatus.InTransit]: "In transit",
    [EnumShipmentStatus.Delivered]: "Delivered",
    [EnumShipmentStatus.CheckedIn]: "Checked in",
    [EnumShipmentStatus.Receiving]: "Receiving",
    [EnumShipmentStatus.Closed]: "Closed",
    [EnumShipmentStatus.Cancelled]: "Cancelled",
    [EnumShipmentStatus.Deleted]: "Deleted",
};

export const shipmentStatusList = Object.entries(shipmentStatusLabels).map(([value, name]) => ({
    name,
    value: value as EnumShipmentStatus,
}));


export const repriceFilter = [
    { name: "All", value: "" },
    { name: "Repricing", value: "Repricing" },
    { name: "Not Repricing", value: "Not Repricing" },
    { name: "Minimum", value: "Minimum" },
    { name: "Not at Minimum", value: "Not at Minimum" },
    { name: "Maximum", value: "Maximum" },
    { name: "Not at Maximum", value: "Not at Maximum" },
    { name: "Buy Box Win", value: "Buy Box Win" },
    { name: "Not Buy Box Wi", value: "Not Buy Box Wi" },
]

export const expensesCategory = [
    { name: "Accountancy Fees", value: "Accountancy Fees" },
    { name: "Salary", value: "Salary" },
    { name: "Virtual Assistant", value: "Virtual Assistant" },
    { name: "Prepping Service", value: "Prepping Service" },
    { name: "Prepping Supplies", value: "Prepping Supplies" },
    { name: "Subscriptions", value: "Subscriptions" },
    { name: "Postage", value: "Postage" },
    { name: "Equipment", value: "Equipment" },
    { name: "Office Rent", value: "Office Rent" },
    { name: "Training", value: "Training" },
    { name: "Interest", value: "Interest" },
    { name: "Bank Charge", value: "Bank Charge" },
    { name: "Insurance Costs", value: "Insurance Costs" },
    { name: "Office expenses and supplies", value: "Office expenses and supplies" },
    { name: "Warehouse expenses and supplies", value: "Warehouse expenses and supplies" },
    { name: "Maintenance and repair costs", value: "Maintenance and repair costs" },
    { name: "Utility", value: "Utility" },
    { name: "Travel", value: "Travel" },
    { name: "Fuel", value: "Fuel" },
    { name: "Mileage", value: "Mileage" },
    { name: "Phone", value: "Phone" },
    { name: "Broadband", value: "Broadband" },
    { name: "Cashback", value: "Cashback" },
    { name: "Miscellaneous", value: "Miscellaneous" },
]

export const recursList = [
    { name: "Never", value: "one_time" },
    { name: "Weekly", value: "weekly" },
    { name: "Monthly", value: "monthly" },
    { name: "Quarterly", value: "quarterly" },
    { name: "Anually", value: "anually" }
]

export const vatList = [
    { name: "19%", value: "19%" },
    { name: "20%", value: "20%" },
    { name: "21%", value: "21%" },
    { name: "22%", value: "22%" },
    { name: "25%", value: "25%" },
    { name: "Exempt", value: "0%" },
]

export const repriceRuleList = [
    { name: "Price", value: "Price" },
    { name: "Profit", value: "Shipped" },
    { name: "ROI", value: "ROI" },
    { name: "Margin", value: "Margin" },
]