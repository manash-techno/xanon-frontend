import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoader from "@/components/PageLoader";
import { AuthLayout } from "@/components/layouts/AuthLayout.tsx";

/**
 * AuthOutlet Layout:
 * - Wraps all authentication pages with a layout.
 * - Ensures the theme and branding consistency.
 */
export const AuthOutlet = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <AuthLayout>
                <Outlet />
            </AuthLayout>
        </Suspense>
    );
};
