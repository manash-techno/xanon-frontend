import { envConfig } from "@/config/env.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "@/store/store.ts";

// Define Base Query with Explicit Typing
const baseQuery = fetchBaseQuery({
    baseUrl: envConfig.API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token; // Get token from Redux
        if (token) {
            console.log("token => ", { token });
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Define API Slice with Explicit Type
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    tagTypes: ["Auth", "Countries", "Orders"],
    endpoints: () => ({}),
});