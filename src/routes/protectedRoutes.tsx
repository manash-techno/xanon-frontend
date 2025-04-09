import {Navigate, RouteObject} from "react-router-dom";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import {lazyLoader} from "@/hocs/lazyLoader.tsx";
import {DashboardMainOutlet} from "@/routes/outlets/DashboardOutlets/DashboardMainOutlet.tsx";
import {pagePaths} from "@/config/pagePaths.ts";

export const protectedRoutes: RouteObject[] = [
    {
        element: <AuthMiddleware requireAuth={true} redirectPath={pagePaths.auth.login}>
            <DashboardMainOutlet/>
        </AuthMiddleware>,
        children: [
            { index: true, element: lazyLoader(() => import("@/pages/dashboard/DashboardPage.tsx"))},
            { path: "orders", element: lazyLoader(() => import("@/pages/dashboard/OrdersPage"))},
            { path: "inventory", element: lazyLoader(() => import("@/pages/dashboard/InventoryPage"))},
            { path: "inventory/details/:id", element: lazyLoader(() => import("@/pages/dashboard/InventoryPage/Details"))},
            { path: "shipment", element: lazyLoader(() => import("@/pages/dashboard/ShipmentsPage"))},
            { path: "reprice", element: lazyLoader(() => import("@/pages/dashboard/RepricesPage"))},
            { path: "reprice/details/:id", element: lazyLoader(() => import("@/pages/dashboard/RepricesPage/RepriceDetails"))},
            { path: "expenses", element: lazyLoader(() => import("@/pages/dashboard/ExpensesPage"))},
            { path: "expenses/add", element: lazyLoader(() => import("@/pages/dashboard/ExpensesPage/Add"))},
            {
                path: "reconciliation",
                element: lazyLoader(() => import("@/pages/dashboard/ReconciliationsPage")),
                children: [
                    // { index: true, element: <Navigate to="/" replace /> },
                    { index: true, element: lazyLoader(() => import("@/pages/dashboard/ReconciliationsPage/Inventory"))},
                    { path: "shipment", element: lazyLoader(() => import("@/pages/dashboard/ReconciliationsPage/Shipment"))},
                ],
            },
            { path: "leaderboard", element: lazyLoader(() => import("@/pages/dashboard/LeaderboardsPage"))},
            { path: "*", element: <Navigate to={pagePaths.dashboard.root} replace /> },
        ],
    },
] as RouteObject[];
