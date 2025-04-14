import { Outlet } from "react-router-dom";
import {ReconciliationLayout} from "@/components/layouts/DashboardLayout/ReconciliationLayout.tsx";
import {PageTransition} from "@/components/PageTransition.tsx";

export const ReconcialationOutlet = () => {
    return (
        <ReconciliationLayout>
            <PageTransition>
                <Outlet />
            </PageTransition>
        </ReconciliationLayout>
    );
};
