import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iCountry, iInventoryStatus } from "@/types/inventoryTypes";

interface iInventoryState {
    search: string;
    selectedStatus: iInventoryStatus | null;
    selectedCountry: iCountry | null;
    currentPage: number;
    totalPages: number;
}

const initialState: iInventoryState = {
    search: "",
    selectedStatus: null,
    selectedCountry: null,
    currentPage: 1,
    totalPages: 1,
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setSelectedStatus: (state, action: PayloadAction<iInventoryStatus | null>) => {
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
} = inventorySlice.actions;

export default inventorySlice.reducer;