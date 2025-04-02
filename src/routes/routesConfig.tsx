import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import { envConfig } from "@/config/env";
import { authRoutes } from "@/routes/authRoutes";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import {protectedRoutes} from "@/routes/protectedRoutes.tsx";

const basename = envConfig.HOMEPAGE;

const routes: RouteObject[] = [

    // Default Redirect Based on Auth State
    { index: true, element: <Navigate to="/dashboard" replace /> },

    // Authentication Routes (For Unauthenticated Users)
    {
        path: "/auth",
        children: authRoutes,
    },

    // Protected Routes (For Authenticated Users)
    {
        path: "/dashboard",
        children: protectedRoutes,
    },

    // Not Found Page
    { path: "/404", element: <NotFoundPage /> },
    { path: "*", element: <Navigate to="/404" replace /> },
] as RouteObject[];

export const routerConfig = createBrowserRouter(routes, { basename });
