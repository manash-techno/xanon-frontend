import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { iCountry } from "@/types/countriesTypes";
import { enumFulfillmentTab } from "@/constants/fulfillmentTab.ts";
import { EnumRepriceStatus } from "@/constants/filter.ts";

interface iRepriceState {
    search: string;
    fulfillmentChannel: enumFulfillmentTab;
    selectedCountry: iCountry | null;
    selectedStatus: EnumRepriceStatus;
    startDate: string|null;
    endDate: string|null;
    dateRangeLabel: string|null;
    currentPage: number;
    totalPages: number;
}

const initialState: iRepriceState = {
    search: "",
    fulfillmentChannel: enumFulfillmentTab.All,
    selectedCountry: null,
    selectedStatus: EnumRepriceStatus.All,
    startDate: null,
    endDate: null,
    dateRangeLabel: null,
    currentPage: 1,
    totalPages: 1,
};

const repriceSlice = createSlice({
    name: "reprice",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setFulfillmentChannel: (state, action: PayloadAction<enumFulfillmentTab>) => {
            state.fulfillmentChannel = action.payload;
        },
        setSelectedCountry: (state, action: PayloadAction<iCountry | null>) => {
            state.selectedCountry = action.payload;
        },
        setSelectedStatus: (state, action: PayloadAction<EnumRepriceStatus>) => {
            state.selectedStatus = action.payload;
        },
        setStartDate: (state, action: PayloadAction<string|null>) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action: PayloadAction<string|null>) => {
            state.endDate = action.payload;
        },
        setDateRange: (state, action: PayloadAction<{ startDate: string|null; endDate: string|null, label: string|null }>) => {
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
            state.dateRangeLabel = action.payload.label;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
    },
});

export const {
    setSearch,
    setFulfillmentChannel,
    setSelectedCountry,
    setSelectedStatus,
    setStartDate,
    setEndDate,
    setDateRange,
    setCurrentPage,
    setTotalPages,
} = repriceSlice.actions;

export default repriceSlice.reducer;
