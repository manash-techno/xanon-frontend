import { Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {PageTransition} from "@/components/PageTransition.tsx";

/**
 * AuthOutlet Layout:
 * - Wraps all authentication pages with a layout.
 * - Ensures the theme and branding consistency.
 */
export const DashboardOutlet = () => {
    return (
        <DashboardLayout>
            <PageTransition>
                <Outlet />
            </PageTransition>
        </DashboardLayout>
    );
};
