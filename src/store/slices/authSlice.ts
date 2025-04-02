import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/store/api/authApi.ts";
import {iLoginResponse, iUser} from "@/types/authTypes.ts";

// Define the expected authentication state structure
interface iAuthState {
    user: iUser | null;
    token: string | null;
    refresh: string | null;
    isAuthenticated: boolean;
}

const initialState: iAuthState = {
    user: null,
    token: null,
    refresh: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state: iAuthState,
            action: PayloadAction<{ user?: iUser|null; token: string; refresh: string }>
        ) => {
            state.user = action.payload.user ?? null;
            state.token = action.payload.token;
            state.refresh = action.payload.refresh;
            state.isAuthenticated = !!action.payload.token;
        },
        logout: (state: iAuthState) => {
            state.user = null;
            state.token = null;
            state.refresh = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state: iAuthState, action: PayloadAction<iLoginResponse>) => {
                state.user = action.payload.user;
                state.token = action.payload.access;
                state.refresh = action.payload.refresh;
                state.isAuthenticated = !!action.payload.access;
            }
        );
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
