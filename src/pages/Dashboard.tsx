import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
    const { user, handleLogout } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Welcome, {user?.email || "User"}!</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
