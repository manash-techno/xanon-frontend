import { AuthFormWrapper } from "@/components/AuthFormWrapper";
import { AssetsConfig } from "@/config/assetsConfig";
import { pagePaths } from "@/config/pagePaths";
import { useResetPasswordMutation } from "@/store/api/authApi";
import { JSX, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const ResetPasswordPage: () => JSX.Element = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConPassword, setShowConPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    if (!uid || !token) {
        return <Navigate to="/auth/login" replace />;
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await resetPassword({ uid, new_password: password, token }).unwrap();
            setMessage("Password reset successful! Redirecting to Login...");
            setPassword("");
            setConfirmPassword("");
            setShowPassword(false);
            setShowConPassword(false);
            // Optionally, redirect to login or show success message
            setTimeout(() => navigate(pagePaths.auth.login), 2000);
        } catch (err: unknown) {
            console.log("err => ", {err})
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <AuthFormWrapper
            onSubmit={onSubmit}
            className="p-8 rounded-2xl w-[345px] flex flex-col gap-6
                       bg-white text-gray-900 shadow-md
                       dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg min-h-[400px]"
        >
            <div className="flex justify-center">
                <img
                    width={60}
                    height={60}
                    src={AssetsConfig.images.branding.logoSingle.src}
                    alt={AssetsConfig.images.branding.logoSingle.alt}
                />
            </div>
            <h1 className="text-[#1E1E1E] dark:text-[#F2F2F2] font-bold text-xl">
                Reset Password
            </h1>
            {error && (
                <div
                    className="w-full p-3 mb-4 text-sm font-medium text-red-800 bg-red-100 border border-red-400 rounded-md">
                    {error}
                </div>
            )}
            {message && (
                <div
                    className="w-full p-3 mb-4 text-sm font-medium text-green-800 bg-green-100 border border-green-400 rounded-md">
                    {message}
                </div>
            )}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-0">
                    <label
                        htmlFor="email"
                        className="text-xs text-gray-700 dark:text-[#F2F2F2]"
                    >
                        Email
                    </label>
                    <div className="text-md text-[#1E1E1E] dark:text-[#F2F2F2] font-bold">
                        Youremail@gmailcom
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="password"
                        className="text-[14px] text-[#1E1E1E] dark:text-[#F2F2F2]"
                    >
                        Create Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            id="password"
                            className="rounded-md px-3 py-2.5 border text-sm w-full pr-11
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img
                            className="absolute top-2.5 right-3 cursor-pointer dark:invert"
                            src={showPassword ? AssetsConfig.icons.eyeOff.src : AssetsConfig.icons.eye.src}
                            width={20}
                            height={20}
                            alt={AssetsConfig.icons.eye.alt}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    <ul className="list-disc list-inside text-[#6E8091] dark:text-[#828282] font-normal pl-2 text-xs flex flex-col gap-1 mt-2">
                        <li>Has at least 8 characters (no spaces)</li>
                        <li>Has letters, numbers, and special characters</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="password"
                        className="text-[14px] text-[#1E1E1E] dark:text-[#F2F2F2]"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConPassword ? "text" : "password"}
                            placeholder="Re-enter Password"
                            id="password"
                            className="rounded-md px-3 py-2.5 border text-sm w-full pr-11
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <img
                            className="absolute top-2.5 right-3 cursor-pointer dark:invert"
                            src={showConPassword ? AssetsConfig.icons.eyeOff.src : AssetsConfig.icons.eye.src}
                            width={20}
                            height={20}
                            alt={AssetsConfig.icons.eye.alt}
                            onClick={() => setShowConPassword(!showConPassword)}
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className={`text-center rounded-md w-full py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#292929] 
                           text-white hover:bg-[#005bb5] dark:hover:bg-[#100F0F] 
                           cursor-pointer
                           ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Save"}
            </button>
        </AuthFormWrapper>
    )
}

export default ResetPasswordPage;