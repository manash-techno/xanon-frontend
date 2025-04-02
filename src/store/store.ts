import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "@/store/slices/authSlice";
import orderReducer from "@/store/slices/orderSlice";
import inventoryReducer from "@/store/slices/inventorySlice.ts";
import { apiSlice } from "@/store/slices/apiSlice.ts";
import {cookieStorage} from "@/store/cookieStorage.ts";
import {envConfig} from "@/config/env.ts";

// Configure Redux Persist with custom cookie storage
const authPersistConfig = {
    key: "auth",
    storage: cookieStorage,
    debug: envConfig.DEBUG,
    version: 1
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    [apiSlice.reducerPath]: apiSlice.reducer,
    order: orderReducer,
    inventory: inventoryReducer,
});

// Create Redux store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
        .concat(apiSlice.middleware),
});

// Persist instance for Redux Persist
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
