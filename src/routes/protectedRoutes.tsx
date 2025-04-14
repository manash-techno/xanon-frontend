import { Navigate, RouteObject } from "react-router-dom";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import { lazyLoader } from "@/hocs/lazyLoader.tsx";
import { DashboardMainOutlet } from "@/routes/outlets/DashboardOutlets/DashboardMainOutlet.tsx";
import { pagePaths } from "@/config/pagePaths.ts";
import { withPageMeta } from "@/hocs/withPageMeta";
import { PROTECTED_PAGE_META } from "@/constants/meta";
import { JSX } from "react";

export const protectedRoutes: RouteObject[] = [
    {
        element: <AuthMiddleware requireAuth={true} redirectPath={pagePaths.auth.login}>
            <DashboardMainOutlet />
        </AuthMiddleware>,
        children: [
            {
                index: true, element: lazyLoader(
                    () => import("@/pages/dashboard/DashboardPage.tsx"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.DASHBOARD) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "orders", element: lazyLoader(
                    () => import("@/pages/dashboard/OrdersPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.ORDERS) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "inventory", element: lazyLoader(
                    () => import("@/pages/dashboard/InventoryPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.INVENTORY) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "inventory/details/:id", element: lazyLoader(
                    () => import("@/pages/dashboard/InventoryPage/Details"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.INVENTORY_DETAILS) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "shipment", element: lazyLoader(
                    () => import("@/pages/dashboard/ShipmentsPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.SHIPMENT) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "reprice", element: lazyLoader(
                    () => import("@/pages/dashboard/RepricesPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.REPRICE) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "reprice/rules", element: lazyLoader(
                    () => import("@/pages/dashboard/RepricesPage/Rules"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.REPRICE_RULES) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "reprice/rules/add", element: lazyLoader(
                    () => import("@/pages/dashboard/RepricesPage/Rules/AddEdit"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.REPRICE_RULES_ADD) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "reprice/rules/edit/:id", element: lazyLoader(
                    () => import("@/pages/dashboard/RepricesPage/Rules/AddEdit"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.REPRICE_RULES_EDIT) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "reprice/details/:id", element: lazyLoader(
                    () => import("@/pages/dashboard/RepricesPage/RepriceDetails"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.REPRICE_DETAILS) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "expenses", element: lazyLoader(
                    () => import("@/pages/dashboard/ExpensesPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.EXPENSES) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "expenses/add", element: lazyLoader(
                    () => import("@/pages/dashboard/ExpensesPage/AddEdit"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.EXPENSES_ADD) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "expenses/edit/:id", element: lazyLoader(
                    () => import("@/pages/dashboard/ExpensesPage/AddEdit"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.EXPENSES_EDIT) as unknown as (props: unknown) => JSX.Element
                )
            },
            {
                path: "reconciliation",
                element: lazyLoader(
                    () => import("@/pages/dashboard/ReconciliationsPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.RECONCILIATION) as unknown as (props: unknown) => JSX.Element
                ),
                children: [
                    // { index: true, element: <Navigate to="/" replace /> },
                    {
                        index: true, element: lazyLoader(
                            () => import("@/pages/dashboard/ReconciliationsPage/Inventory"),
                            (Comp: React.ComponentType<any>) =>
                                withPageMeta(Comp, PROTECTED_PAGE_META.RECONCILIATION) as unknown as (props: unknown) => JSX.Element
                        )
                    },
                    {
                        path: "shipment", element: lazyLoader(
                            () => import("@/pages/dashboard/ReconciliationsPage/Shipment"),
                            (Comp: React.ComponentType<any>) =>
                                withPageMeta(Comp, PROTECTED_PAGE_META.RECONCILIATION) as unknown as (props: unknown) => JSX.Element
                        )
                    },
                ],
            },
            {
                path: "leaderboard", element: lazyLoader(
                    () => import("@/pages/dashboard/LeaderboardsPage"),
                    (Comp: React.ComponentType<any>) =>
                        withPageMeta(Comp, PROTECTED_PAGE_META.LEADERBOARD) as unknown as (props: unknown) => JSX.Element
                )
            },
            { path: "*", element: <Navigate to={pagePaths.dashboard.root} replace /> },
        ],
    },
] as RouteObject[];
