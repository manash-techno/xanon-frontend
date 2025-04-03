import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCountry } from "@/types/countriesTypes";
import { EnumShipmentStatus } from "@/constants/filter";

interface iShipmentState {
    search: string;
    selectedStatus: EnumShipmentStatus;
    startDate: string|null;
    endDate: string|null;
    dateRangeLabel: string|null;
    selectedCountry: iCountry | null;
    currentPage: number;
    totalPages: number;
}

const initialState: iShipmentState = {
    search: "",
    selectedStatus: EnumShipmentStatus.All,
    startDate: "",
    endDate: "",
    dateRangeLabel: null,
    selectedCountry: null,
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
        setSelectedStatus: (state, action: PayloadAction<EnumShipmentStatus>) => {
            state.selectedStatus = action.payload;
        },
        setSelectedCountry: (state, action: PayloadAction<iCountry | null>) => {
            state.selectedCountry = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setDateRange: (state, action: PayloadAction<{ startDate: string|null; endDate: string|null, label: string|null }>) => {
            state.startDate = action.payload.startDate;
            state.endDate = action.payload.endDate;
            state.dateRangeLabel = action.payload.label;
        },
    },
});

export const {
    setSearch,
    setSelectedStatus,
    setSelectedCountry,
    setCurrentPage,
    setTotalPages,
    setDateRange,
} = shipmentSlice.actions;

export default shipmentSlice.reducer;