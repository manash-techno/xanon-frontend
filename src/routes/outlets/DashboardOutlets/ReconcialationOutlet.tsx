import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoader from "@/components/PageLoader.tsx";
import {ReconciliationLayout} from "@/components/layouts/DashboardLayout/ReconciliationLayout.tsx";

export const DashboardMainOutlet = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <ReconciliationLayout>
                <Outlet />
            </ReconciliationLayout>
        </Suspense>
    );
};
