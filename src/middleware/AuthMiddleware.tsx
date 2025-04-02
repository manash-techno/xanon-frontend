import { Navigate, Outlet } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@/store/store";
import {JSX, useMemo} from "react";
import { jwtDecode } from "jwt-decode";
import {pagePaths} from "@/config/pagePaths.ts";
import {logout} from "@/store/slices/authSlice.ts";

interface AuthMiddlewareProps {
    requireAuth?: boolean;    // If `true`, only authenticated users can access
    redirectPath?: string;    // Path to redirect if the condition fails
    children?: JSX.Element;   // Optional custom outlet component
}

interface DecodedToken {
    exp: number;
}

/**
 * Authentication Middleware:
 * - `requireAuth`: Controls access based on authentication status.
 * - `redirectPath`: Defines where the user is redirected if access fails.
 * - `children`: Allows passing a custom wrapper or layout instead of `<Outlet />`.
 * -  Restricts routes based on authentication and token expiration.
 */
const AuthMiddleware = ({ requireAuth, redirectPath, children }: AuthMiddlewareProps) => {
    const dispatch = useDispatch();

    const token = useSelector((state: RootState) => state.auth.token);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    /**
     * Check if token is valid and not expired
     */
    const isTokenValid = useMemo(() => {
        if (!token) return false;

        try {
            const decoded: DecodedToken = jwtDecode(token);
            console.log('decoded => ', decoded);
            return decoded.exp * 1000 > Date.now(); // Compare with current timestamp
        } catch (error) {
            console.error("Invalid token:", error);
            return false;
        }
    }, [token]);

    // Restrict access if authentication is required but token is invalid/expired
    if (requireAuth && (!isAuthenticated || !isTokenValid)) {
        dispatch(logout());
        return <Navigate to={redirectPath || pagePaths.auth.login} replace />;
    }

    // Allow only unauthenticated users for public routes
    if (!requireAuth && isAuthenticated && isTokenValid) {
        return <Navigate to={redirectPath || pagePaths.dashboard.root} replace />;
    }

    return children || <Outlet />; // If user meets condition, render children or outlet
};

export default AuthMiddleware;
