import { createSlice } from "@reduxjs/toolkit";

export interface iRegisterState {
    userId: number | null;
    userEmail: string | null;
    otp: number | null;
}


const initialState: iRegisterState = {
    userId: null,
    userEmail: null,
    otp: null,
}

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setRegisterEmail: (state, action) => {
            state.userEmail = action.payload;
        },
        setOTP: (state, action) => {
            state.otp = action.payload;
        },
        resetRegisterState: (state) => {
            state.userId = null;
            state.userEmail = null;
            state.otp = null;
        }
    },
})

export const {
    setRegisterEmail,
    setUserId,
    setOTP,
    resetRegisterState,
} = registerSlice.actions;
export const registerReducer = registerSlice.reducer;