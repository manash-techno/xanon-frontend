const ASSET_BASE_PATH = "/assets";

export const AssetsConfig = {
    icons: {
        back: { src: `${ASSET_BASE_PATH}/icons/back.svg`, alt: "Back Icon" },
        eye: { src: `${ASSET_BASE_PATH}/icons/eye.svg`, alt: "Eye Icon" },
        logout: { src: `${ASSET_BASE_PATH}/icons/logout.svg`, alt: "Logout Icon" },
        notification: { src: `${ASSET_BASE_PATH}/icons/notification.svg`, alt: "Notification Icon" },
        arrowUpRightOrange: { src: `${ASSET_BASE_PATH}/icons/arrow-up-right-orange.svg`, alt: "Up Right Icon" },
        chevronUp: { src: `${ASSET_BASE_PATH}/icons/chevron-up.svg`, alt: "Up Icon" },
        arrowUpGreen: { src: `${ASSET_BASE_PATH}/icons/arrow-up.svg`, alt: "Arrow Up Green Icon" },
        arrowUpRightGreen: { src: `${ASSET_BASE_PATH}/icons/arrow-up-right-green.svg`, alt: "Arrow Up Right Green Icon" },
        chevronDown: { src: `${ASSET_BASE_PATH}/icons/chevron-down.svg`, alt: "Down Icon" },
        rightUp: { src: `${ASSET_BASE_PATH}/icons/right-up.svg`, alt: "Right Up Icon" },
        search: { src: `${ASSET_BASE_PATH}/icons/search.svg`, alt: "Search Icon" },
        menu_icon: { src: `${ASSET_BASE_PATH}/icons/menu.svg`, alt: "Menu Icon" },
        menu: {
            dashboardActive: { src: `${ASSET_BASE_PATH}/icons/menu/dashboard-active.svg`, alt: "Dashboard Active Icon" },
            dashboard: { src: `${ASSET_BASE_PATH}/icons/menu/dashboard.svg`, alt: "Dashboard Icon" },
            expensesActive: { src: `${ASSET_BASE_PATH}/icons/menu/expenses-active.svg`, alt: "Expenses Active Icon" },
            expenses: { src: `${ASSET_BASE_PATH}/icons/menu/expenses.svg`, alt: "Expenses Icon" },
            inventoryActive: { src: `${ASSET_BASE_PATH}/icons/menu/inventory-active.svg`, alt: "Inventory Active Icon" },
            inventory: { src: `${ASSET_BASE_PATH}/icons/menu/inventory.svg`, alt: "Inventory Icon" },
            leaderboardActive: { src: `${ASSET_BASE_PATH}/icons/menu/leaderboard-active.svg`, alt: "Leaderboard Active Icon" },
            leaderboard: { src: `${ASSET_BASE_PATH}/icons/menu/leaderboard.svg`, alt: "Leaderboard Icon" },
            ordersActive: { src: `${ASSET_BASE_PATH}/icons/menu/orders-active.svg`, alt: "Orders Active Icon" },
            orders: { src: `${ASSET_BASE_PATH}/icons/menu/orders.svg`, alt: "Orders Icon" },
            reconciliationActive: { src: `${ASSET_BASE_PATH}/icons/menu/reconciliation-active.svg`, alt: "Reconciliation Active Icon" },
            reconciliation: { src: `${ASSET_BASE_PATH}/icons/menu/reconciliation.svg`, alt: "Reconciliation Icon" },
            repriceActive: { src: `${ASSET_BASE_PATH}/icons/menu/reprice-active.svg`, alt: "Reprice Active Icon" },
            reprice: { src: `${ASSET_BASE_PATH}/icons/menu/reprice.svg`, alt: "Reprice Icon" },
            shipmentActive: { src: `${ASSET_BASE_PATH}/icons/menu/shipment-active.svg`, alt: "Shipment Active Icon" },
            shipment: { src: `${ASSET_BASE_PATH}/icons/menu/shipment.svg`, alt: "Shipment Icon" },
        },

        fallbackImage: { src: `${ASSET_BASE_PATH}/icons/fallback.webp`, alt: "Missing Image" },
            defaultProductImage: { src: `${ASSET_BASE_PATH}/icons/box.png`, alt: "Missing Product Image" },
        infoIcon: { src: `${ASSET_BASE_PATH}/icons/info.svg`, alt: "Info Icon" }
    },
    images: {
        backgroundAuth: { src: `${ASSET_BASE_PATH}/images/background-auth.png`, alt: "Background for Authentication" },
        backgroundLogin: { src: `${ASSET_BASE_PATH}/images/background-login.png`, alt: "Background for Login Page" },
        branding: {
            logo: { src: `${ASSET_BASE_PATH}/images/branding/logo.png`, alt: "Company Logo" },
            logoX: { src: `${ASSET_BASE_PATH}/images/branding/logo-x.png`, alt: "Company Logo - X" },
            logoSingle: { src: `${ASSET_BASE_PATH}/images/branding/logo-single.png`, alt: "Company Logo (Single)" },
        }
    },
};
