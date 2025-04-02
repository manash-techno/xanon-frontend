import {ReactNode} from "react";
import {ThemeProvider} from "@/Providers/ThemeProvider.tsx";
import {persistor, store} from "@/store/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>
              <Provider store={store}>
                  <PersistGate loading={null} persistor={persistor}>
                      {(bootstrapped) => (bootstrapped ? children : null)}
                  </PersistGate>
              </Provider>
          </ThemeProvider>
}