import { Navigate, RouteObject } from "react-router-dom";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import { AuthOutlet } from "@/routes/outlets/AuthOutlet";
import { lazyLoader } from "@/hocs/lazyLoader.tsx";
import { pagePaths } from "@/config/pagePaths.ts";
import { withPageMeta } from "@/hocs/withPageMeta.tsx";
import { JSX } from "react";
import { AUTH_PAGE_META } from "@/constants/meta";

export const authRoutes: RouteObject[] = [
    {
        element: (
            <AuthMiddleware requireAuth={false} redirectPath={pagePaths.dashboard.root}>
                <AuthOutlet />
            </AuthMiddleware>
        ),
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            {
                path: "login", element: lazyLoader(
                    () => import("@/pages/auth/LoginPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, AUTH_PAGE_META.LOGIN) as unknown as (props: unknown) => JSX.Element
                ),
            },
            {
                path: "register", element: lazyLoader(
                    () => import("@/pages/auth/RegisterPage.tsx"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, AUTH_PAGE_META.REGISTER) as unknown as (props: unknown) => JSX.Element
                ),
            },
            {
                path: "forget-password", element: lazyLoader(
                    () => import("@/pages/auth/ForgetPasswordPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, AUTH_PAGE_META.FORGOT_PASSWORD) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "reset-password/:uid/:token", element: lazyLoader(
                    () => import("@/pages/auth/ResetPasswordPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, AUTH_PAGE_META.RESET_PASSWORD) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "email-verification", element: lazyLoader(() => import("@/pages/auth/EmailVerificationPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, AUTH_PAGE_META.EMAIL_VERIFICATION) as unknown as (props: unknown) => JSX.Element
                )
            },
            { path: "subscription", element: lazyLoader(() => import("@/pages/auth/SubscriptionPage")) },
            { path: "*", element: <Navigate to="/auth/login" replace /> },
        ],
    },
] as RouteObject[];
