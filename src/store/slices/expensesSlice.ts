import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCountry } from "@/types/countriesTypes";
import { EnumExpensesCategory, EnumShipmentStatus } from "@/constants/filter";
import { enumFulfillmentTab } from "@/constants/fulfillmentTab";

interface iExpensesState {
    search: string;
    selectedCategory: EnumExpensesCategory;
    fulfillmentChannel: enumFulfillmentTab;
    startDate: string | null;
    endDate: string | null;
    dateRangeLabel: string | null;
    currentPage: number;
    totalPages: number;
}

const initialState: iExpensesState = {
    search: "",
    selectedCategory: EnumExpensesCategory.All,
    fulfillmentChannel: enumFulfillmentTab.All,
    startDate: "",
    endDate: "",
    dateRangeLabel: null,
    currentPage: 1,
    totalPages: 1,
};

const shipmentSlice = createSlice({
    name: "shipment",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSelectedCategory: (state, action: PayloadAction<EnumExpensesCategory>) => {
            state.selectedCategory = action.payload;
        },
        setFulfillmentChannel: (state, action: PayloadAction<enumFulfillmentTab>) => {
            state.fulfillmentChannel = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setDateRange: (state, action: PayloadAction<{ startDate: string | null; endDate: string | null, label: string | null }>) => {
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
            state.dateRangeLabel = action.payload.label;
        },
    },
});

export const {
    setSearch,
    setFulfillmentChannel,
    setSelectedCategory,
    setCurrentPage,
    setTotalPages,
    setDateRange,
} = shipmentSlice.actions;

export default shipmentSlice.reducer;