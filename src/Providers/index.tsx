import { ReactNode } from "react";
import { ThemeProvider } from "@/Providers/ThemeProvider.tsx";
import { persistor, store } from "@/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'


export const Providers = ({ children }: { children: ReactNode }) => {
    return <ThemeProvider>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <PersistGate loading={null} persistor={persistor}>
                    {(bootstrapped) => (bootstrapped ? children : null)}
                </PersistGate>
            </LocalizationProvider>
        </Provider>
    </ThemeProvider>
}