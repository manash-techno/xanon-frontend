import { Link, useLocation } from "react-router-dom";
import { JSX, ReactNode } from "react";

interface ReconciliationLayoutProps {
    children: ReactNode;
}

export const ReconciliationLayout: ({children}: ReconciliationLayoutProps) => JSX.Element = ({ children }) => {
    const { pathname } = useLocation();

    return (
        <div>
            <div className="flex items-center">
                <Link
                    to="/dashboard/reconciliation"
                    className={`text-xl ${!pathname.includes("shipment") ? "font-semibold" : "text-[#6E8091]"}`}
                >
                    Inventory
                </Link>
                <Link
                    to="/dashboard/reconciliation/shipment"
                    className={`text-xl ml-4 ${pathname.includes("shipment") ? "font-semibold" : "text-[#6E8091]"}`}
                >
                    Shipment
                </Link>
            </div>
            <div className="mt-4">
                {children}
            </div>
        </div>
    )
}