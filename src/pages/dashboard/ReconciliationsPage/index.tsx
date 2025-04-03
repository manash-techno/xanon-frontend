import { JSX } from 'react'
import { Link, Outlet } from 'react-router-dom'

const ReconciliationsPage: () => JSX.Element = () => {
    return (
        <div>
            <Link to="/dashboard/reconciliation">
                Inventory
            </Link>
            <Link to="/dashboard/reconciliation/shipment">
                Shipment
            </Link>
            
            <Outlet />
        </div>
    )
}

export default ReconciliationsPage