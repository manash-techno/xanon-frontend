export const pagePaths = {
    home: "/",
    auth: {
        root: "/auth",
        login: "/auth/login",
        register: "/auth/register",
        forgetPassword: "/auth/forget-password",
        resetPassword: "/auth/reset-password",
        emailVerification: "/auth/email-verification",
        subscription: "/auth/subscription",
    },
    dashboard: {
        root: "/dashboard",
        orders: "/dashboard/orders",
        inventory: "/dashboard/inventory",
        inventoryDetails: "/dashboard/inventory/details",
        shipment: "/dashboard/shipment",
        expenses: "/dashboard/expenses",
        reprice: "/dashboard/reprice",
        repriceDetails: "/dashboard/reprice/details",
        repriceRules: "/dashboard/reprice/rules",
        repriceRulesAddEdit: "/dashboard/reprice/rules/add",
        repriceRulesEdit: "/dashboard/reprice/rules/edit",
        reconciliation: "/dashboard/reconciliation",
        leaderboard: "/dashboard/leaderboard",
    },
    notFound: "/404"
};
