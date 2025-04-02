import {Navigate, RouteObject} from "react-router-dom";
import AuthMiddleware from "@/middleware/AuthMiddleware";
import {lazyLoader} from "@/hocs/lazyLoader.tsx";
import {DashboardOutlet} from "@/routes/outlets/DashboardOutlet.tsx";
import {pagePaths} from "@/config/pagePaths.ts";

export const protectedRoutes: RouteObject[] = [
    {
        element: <AuthMiddleware requireAuth={true} redirectPath={pagePaths.auth.login}>
            <DashboardOutlet/>
        </AuthMiddleware>,
        children: [
            { index: true, element: lazyLoader(() => import("@/pages/dashboard/DashboardPage.tsx")) },
            { path: "orders", element: lazyLoader(() => import("@/pages/dashboard/OrdersPage")) },
            { path: "inventory", element: lazyLoader(() => import("@/pages/dashboard/InventoryPage.tsx")) },
            { path: "shipment", element: lazyLoader(() => import("@/pages/dashboard/ShipmentsPage")) },
            { path: "reprice", element: lazyLoader(() => import("@/pages/dashboard/RepricesPage")) },
            { path: "expenses", element: lazyLoader(() => import("@/pages/dashboard/ExpensesPage")) },
            { path: "reconciliation", element: lazyLoader(() => import("@/pages/dashboard/ReconciliationsPage")) },
            { path: "leaderboard", element: lazyLoader(() => import("@/pages/dashboard/LeaderboardsPage")) },
            { path: "*", element: <Navigate to={pagePaths.dashboard.root} replace /> },
        ],
    },
] as RouteObject[];
