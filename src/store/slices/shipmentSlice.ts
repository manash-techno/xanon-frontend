import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCountry } from "@/types/inventoryTypes";
import { iShipmentStatus } from "@/types/shipmentTypes";

interface iShipmentState {
    search: string;
    selectedStatus: iShipmentStatus | null;
    selectedCountry: iCountry | null;
    currentPage: number;
    totalPages: number;
}

const initialState: iShipmentState = {
    search: "",
    selectedStatus: null,
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
        setSelectedStatus: (state, action: PayloadAction<iShipmentStatus | null>) => {
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
    },
});

export const {
    setSearch,
    setSelectedStatus,
    setSelectedCountry,
    setCurrentPage,
    setTotalPages,
} = shipmentSlice.actions;

export default shipmentSlice.reducer;