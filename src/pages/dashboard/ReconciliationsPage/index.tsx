import { JSX } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const ReconciliationsPage: () => JSX.Element = () => {
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
                <Outlet />
            </div>
        </div>
    )
}

export default ReconciliationsPage