import { Navigate, RouteObject } from "react-router-dom";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import { AuthOutlet } from "@/routes/outlets/AuthOutlet";
import { lazyLoader } from "@/hocs/lazyLoader.tsx";
import {pagePaths} from "@/config/pagePaths.ts";
import {withPageMeta} from "@/hocs/withPageMeta.tsx";

export const authRoutes: RouteObject[] = [
    {
        element: (
            <AuthMiddleware requireAuth={false} redirectPath={pagePaths.dashboard.root}>
                <AuthOutlet />
            </AuthMiddleware>
        ),
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            { path: "login", element: lazyLoader(
                    () => import("@/pages/auth/LoginPage"),
                    (Comp) =>
                        withPageMeta(Comp, {
                            title: "Login to Your Account | MyAppName",
                            description: "Access your dashboard securely with your credentials.",
                        })
                ), },
            { path: "register", element: lazyLoader(() => import("@/pages/auth/RegisterPage.tsx"))},
            { path: "forget-password", element: lazyLoader(() => import("@/pages/auth/ForgetPasswordPage"))},
            { path: "reset-password", element: lazyLoader(() => import("@/pages/auth/ResetPasswordPage"))},
            { path: "email-verification", element: lazyLoader(() => import("@/pages/auth/EmailVerificationPage"))},
            { path: "subscription", element: lazyLoader(() => import("@/pages/auth/SubscriptionPage"))},
            { path: "*", element: <Navigate to="/auth/login" replace /> },
        ],
    },
] as RouteObject[];
