import { JSX, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "@/store/api/authApi.ts";
import {AssetsConfig} from "@/config/assetsConfig.ts";
import {pagePaths} from "@/config/pagePaths.ts";

const ForgetPasswordPage: () => JSX.Element = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    useEffect(() => {
        setEmail("");
        setMessage(null);
        setErrorMsg(null);
    }, []);

    const handleForgotPassword = async () => {
        if (!email) {
            setErrorMsg("Email is required.");
            return;
        }

        setMessage(null);
        setErrorMsg(null);

        try {
            await forgotPassword({ email }).unwrap();
            setMessage("A password reset link has been sent to your email.");
            setEmail(""); // Clear input field
        } catch (error) {
            setErrorMsg(error?.data?.message || "Failed to send reset email. Please try again.");
        }
    };

    return (
        <form
            className="p-8 rounded-2xl w-96 flex flex-col gap-6
                       bg-white text-gray-900 shadow-md
                       dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg"
        >
            {/* Back Button & Title */}
            <div className="flex items-center gap-2 mb-6">
                <img
                    src={AssetsConfig.icons.back.src}
                    width={20}
                    height={20}
                    alt={AssetsConfig.icons.back.alt}
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="text-[#15355E] dark:text-gray-100 font-bold text-xl">Forgot Password</h1>
            </div>

            {/* Instruction Text */}
            <div className="text-xs text-gray-700 dark:text-gray-300">
                Please enter the email address associated with your account to reset your password.
            </div>

            {/* Error / Success Message */}
            {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
            {message && <p className="text-sm text-green-500">{message}</p>}

            {/* Email Input */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xs text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        id="email"
                        className="rounded-md px-3 py-2.5 border text-sm
                                   bg-gray-100 dark:bg-gray-700
                                   border-gray-300 dark:border-gray-600
                                   text-gray-900 dark:text-gray-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="button"
                className={`text-center rounded-md w-full py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#005bb5] 
                           text-white hover:bg-[#005bb5] dark:hover:bg-[#003f80] 
                           ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                onClick={handleForgotPassword}
            >
                {isLoading ? "Processing..." : "Continue"}
            </button>

            {/* Footer with Navigation Links */}
            <div className="text-xs text-center text-gray-700 dark:text-gray-300">
                Remember your password?
                <Link className="text-[#0077E5] dark:text-[#68A0FF] font-semibold ml-1" to={pagePaths.auth.login}>
                    Sign in
                </Link>{" "}
                <br />
                Don’t have an account?
                <Link className="text-[#0077E5] dark:text-[#68A0FF] font-semibold ml-1" to={pagePaths.auth.register}>
                    Sign up
                </Link>
            </div>
        </form>
    );
};

export default ForgetPasswordPage;
