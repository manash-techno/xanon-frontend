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


export enum EnumInventoryStatus {
    All = "",
    InStock = "in_stock",
    OutOfStock = "out_of_stock",
    Inbound = "inbound",
    Reserved = "reserved",
    Unfulfillable = "unfulfillable",
    NoCoG = "no_cog",
    Losers = "losers",
    Deleted = "deleted",
}

export const inventoryStatusLabels: {
    [EnumInventoryStatus.All]: string;
    [EnumInventoryStatus.InStock]: string;
    [EnumInventoryStatus.OutOfStock]: string;
    [EnumInventoryStatus.Inbound]: string;
    [EnumInventoryStatus.Reserved]: string;
    [EnumInventoryStatus.Unfulfillable]: string;
    [EnumInventoryStatus.NoCoG]: string;
    [EnumInventoryStatus.Losers]: string;
    [EnumInventoryStatus.Deleted]: string;
} = {
    [EnumInventoryStatus.All]: "All",
    [EnumInventoryStatus.InStock]: "In Stock",
    [EnumInventoryStatus.OutOfStock]: "Out of Stock",
    [EnumInventoryStatus.Inbound]: "Inbound",
    [EnumInventoryStatus.Reserved]: "Reserved",
    [EnumInventoryStatus.Unfulfillable]: "Unfulfillable",
    [EnumInventoryStatus.NoCoG]: "No CoG",
    [EnumInventoryStatus.Losers]: "Losers",
    [EnumInventoryStatus.Deleted]: "Deleted",
};

export const inventoryStatusList = Object.entries(inventoryStatusLabels).map(([value, name]) => ({
    name,
    value: value as EnumInventoryStatus,
}));

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


export enum EnumRepriceStatus {
    All = "",
    Repricing = "Repricing",
    NotRepricing = "Not Repricing",
    Minimum = "Minimum",
    NotAtMinimum = "Not at Minimum",
    Maximum = "Maximum",
    NotAtMaximum = "Not at Maximum",
    BuyBoxWin = "Buy Box Win",
    NotBuyBoxWin = "Not Buy Box Wi",
}

export const repriceStatusLabels: {
    [EnumRepriceStatus.All]: string;
    [EnumRepriceStatus.Repricing]: string;
    [EnumRepriceStatus.NotRepricing]: string;
    [EnumRepriceStatus.Minimum]: string;
    [EnumRepriceStatus.NotAtMinimum]: string;
    [EnumRepriceStatus.Maximum]: string;
    [EnumRepriceStatus.NotAtMaximum]: string;
    [EnumRepriceStatus.BuyBoxWin]: string;
    [EnumRepriceStatus.NotBuyBoxWin]: string;
} = {
    [EnumRepriceStatus.All]: "All",
    [EnumRepriceStatus.Repricing]: "Repricing",
    [EnumRepriceStatus.NotRepricing]: "Not Repricing",
    [EnumRepriceStatus.Minimum]: "Minimum",
    [EnumRepriceStatus.NotAtMinimum]: "Not at Minimum",
    [EnumRepriceStatus.Maximum]: "Maximum",
    [EnumRepriceStatus.NotAtMaximum]: "Not at Maximum",
    [EnumRepriceStatus.BuyBoxWin]: "Buy Box Win",
    [EnumRepriceStatus.NotBuyBoxWin]: "Not Buy Box Wi",
};

export const repriceStatusList = Object.entries(repriceStatusLabels).map(([value, name]) => ({
    name,
    value: value as EnumRepriceStatus,
}));

export enum EnumExpensesCategory {
    All = "",
    AccountancyFees = "Accountancy Fees",
    Salary = "Salary",
    VirtualAssistant = "Virtual Assistant",
    PreppingService = "Prepping Service",
    PreppingSupplies = "Prepping Supplies",
    Subscriptions = "Subscriptions",
    Postage = "Postage",
    Equipment = "Equipment",
    OfficeRent = "Office Rent",
    Training = "Training",
    Interest = "Interest",
    BankCharge = "Bank Charge",
    InsuranceCosts = "Insurance Costs",
    OfficeExpensesAndSupplies = "Office expenses and supplies",
    WarehouseExpensesAndSupplies = "Warehouse expenses and supplies",
    MaintenanceAndRepairCosts = "Maintenance and repair costs",
    Utility = "Utility",
    Travel = "Travel",
    Fuel = "Fuel",
    Mileage = "Mileage",
    Phone = "Phone",
    Broadband = "Broadband",
    Cashback = "Cashback",
    Miscellaneous = "Miscellaneous"
}

export const expensesCategoryLabels: {
    [EnumExpensesCategory.All]: string;
    [EnumExpensesCategory.AccountancyFees]: string;
    [EnumExpensesCategory.Salary]: string;
    [EnumExpensesCategory.VirtualAssistant]: string;
    [EnumExpensesCategory.PreppingService]: string;
    [EnumExpensesCategory.PreppingSupplies]: string;
    [EnumExpensesCategory.Subscriptions]: string;
    [EnumExpensesCategory.Postage]: string;
    [EnumExpensesCategory.Equipment]: string;
    [EnumExpensesCategory.OfficeRent]: string;
    [EnumExpensesCategory.Training]: string;
    [EnumExpensesCategory.Interest]: string;
    [EnumExpensesCategory.BankCharge]: string;
    [EnumExpensesCategory.InsuranceCosts]: string;
    [EnumExpensesCategory.OfficeExpensesAndSupplies]: string;
    [EnumExpensesCategory.WarehouseExpensesAndSupplies]: string;
    [EnumExpensesCategory.MaintenanceAndRepairCosts]: string;
    [EnumExpensesCategory.Utility]: string;
    [EnumExpensesCategory.Travel]: string;
    [EnumExpensesCategory.Fuel]: string;
    [EnumExpensesCategory.Mileage]: string;
    [EnumExpensesCategory.Phone]: string;
    [EnumExpensesCategory.Broadband]: string;
    [EnumExpensesCategory.Cashback]: string;
    [EnumExpensesCategory.Miscellaneous]: string;
} = {
    [EnumExpensesCategory.All]: "All category",
    [EnumExpensesCategory.AccountancyFees]: "Accountancy Fees",
    [EnumExpensesCategory.Salary]: "Salary",
    [EnumExpensesCategory.VirtualAssistant]: "Virtual Assistant",
    [EnumExpensesCategory.PreppingService]: "Prepping Service",
    [EnumExpensesCategory.PreppingSupplies]: "Prepping Supplies",
    [EnumExpensesCategory.Subscriptions]: "Subscriptions",
    [EnumExpensesCategory.Postage]: "Postage",
    [EnumExpensesCategory.Equipment]: "Equipment",
    [EnumExpensesCategory.OfficeRent]: "Office Rent",
    [EnumExpensesCategory.Training]: "Training",
    [EnumExpensesCategory.Interest]: "Interest",
    [EnumExpensesCategory.BankCharge]: "Bank Charge",
    [EnumExpensesCategory.InsuranceCosts]: "Insurance Costs",
    [EnumExpensesCategory.OfficeExpensesAndSupplies]: "Office expenses and supplies",
    [EnumExpensesCategory.WarehouseExpensesAndSupplies]: "Warehouse expenses and supplies",
    [EnumExpensesCategory.MaintenanceAndRepairCosts]: "Maintenance and repair costs",
    [EnumExpensesCategory.Utility]: "Utility",
    [EnumExpensesCategory.Travel]: "Travel",
    [EnumExpensesCategory.Fuel]: "Fuel",
    [EnumExpensesCategory.Mileage]: "Mileage",
    [EnumExpensesCategory.Phone]: "Phone",
    [EnumExpensesCategory.Broadband]: "Broadband",
    [EnumExpensesCategory.Cashback]: "Cashback",
    [EnumExpensesCategory.Miscellaneous]: "Miscellaneous"
};

export const expensesCategoryList = Object.entries(expensesCategoryLabels).map(([value, name]) => ({
    name,
    value: value as EnumExpensesCategory,
}));

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