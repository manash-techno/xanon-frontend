import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import DashboardLayout from "@/components/layouts/DashboardLayout";

/**
 * AuthOutlet Layout:
 * - Wraps all authentication pages with a layout.
 * - Ensures the theme and branding consistency.
 */
export const DashboardOutlet = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </Suspense>
    );
};
