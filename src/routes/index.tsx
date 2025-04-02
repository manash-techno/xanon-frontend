import { RouterProvider } from 'react-router-dom';
import { routerConfig } from "@/routes/routesConfig.tsx";

export const AppRoutes = () => {
    return <RouterProvider router={routerConfig} />;
};
