import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useLogoutMutation } from "@/store/api/authApi.ts";
import { logout } from "@/store/slices/authSlice";

export const useAuth = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [logoutApi] = useLogoutMutation();

    const handleLogout = async () => {
        await logoutApi().unwrap();
        dispatch(logout());
        window.location.href = "/login";
    };

    return { ...auth, handleLogout };
};
