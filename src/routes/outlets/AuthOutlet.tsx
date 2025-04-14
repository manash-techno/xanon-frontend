import { Outlet } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout.tsx";
import {PageTransition} from "@/components/PageTransition.tsx";

/**
 * AuthOutlet Layout:
 * - Wraps all authentication pages with a layout.
 * - Ensures the theme and branding consistency.
 */
export const AuthOutlet = () => {
    return (
        <AuthLayout>
            <PageTransition>
                <Outlet />
            </PageTransition>
        </AuthLayout>
    );
};
