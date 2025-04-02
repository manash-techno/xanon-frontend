import { Navigate, RouteObject } from "react-router-dom";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import { AuthOutlet } from "@/routes/outlets/AuthOutlet";
import { lazyLoader } from "@/hocs/lazyLoader.tsx";
import {pagePaths} from "@/config/pagePaths.ts";

export const authRoutes: RouteObject[] = [
    {
        element: (
            <AuthMiddleware requireAuth={false} redirectPath={pagePaths.dashboard.root}>
                <AuthOutlet />
            </AuthMiddleware>
        ),
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            { path: "login", element: lazyLoader(() => import("@/pages/auth/LoginPage")) },
            { path: "register", element: lazyLoader(() => import("@/pages/auth/RegisterPage.tsx")) },
            { path: "forget-password", element: lazyLoader(() => import("@/pages/auth/ForgetPasswordPage.tsx")) },
            { path: "*", element: <Navigate to="/auth/login" replace /> },
        ],
    },
] as RouteObject[];
