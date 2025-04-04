import {FormEvent, JSX, useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/store/api/authApi.ts";
import { setCredentials } from "@/store/slices/authSlice.ts";
import { Link } from "react-router-dom";
import { iLoginResponse } from "@/types/authTypes.ts";
import {AssetsConfig} from "@/config/assetsConfig.ts";
import {pagePaths} from "@/config/pagePaths.ts";

const LoginPage: () => JSX.Element = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [login, { isLoading, error }] = useLoginMutation();

    useEffect(() => {
        setEmail('');
        setPassword('');
        setShowPassword(false);
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({ email, password }).unwrap();
            const { access, refresh } = response as iLoginResponse;
            dispatch(setCredentials({ token: access, refresh }));
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    /** Properly Extract API Error Message */
    const errorMessage = error && "data" in error && error.data?.detail
        ? error.data.detail
        : "An error occurred. Please try again.";

    return (
        <form
            className="p-8 rounded-2xl w-96 flex flex-col gap-6
                       bg-white text-gray-900 shadow-md
                       dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg"
            onSubmit={handleSubmit}
        >
            <div className="flex justify-center">
            <img src={AssetsConfig.images.branding.logoSingle.src} width={60} height={60} alt={AssetsConfig.images.branding.logoSingle.alt} />
            </div>
            <h1 className="text-[#15355E] dark:text-[#F2F2F2] font-bold text-xl">Sign In</h1>

            <div className="flex flex-col gap-3">
                {/* Display Correct Error Message */}
                {error && <p className="text-red-500 text-sm">{errorMessage}</p>}

                {/* Email Input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xs text-gray-700 dark:text-[#F2F2F2]">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        id="email"
                        className="rounded-md px-3 py-2.5 border text-sm
                                   bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-xs text-gray-700 dark:text-[#F2F2F2]">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            id="password"
                            className="rounded-md px-3 py-2.5 border text-sm w-full pr-11
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <img
                            className="absolute top-2.5 right-3 cursor-pointer dark:invert"
                            src={AssetsConfig.icons.eye.src}
                            width={20}
                            height={20}
                            alt={AssetsConfig.icons.eye.alt}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                </div>

                <Link className="text-xs text-[#0077E5] dark:text-[#1A91FF] cursor-pointer" to={pagePaths.auth.forgetPassword}>
                    Forgot Password?
                </Link>
            </div>

            {/* Sign Up Link */}
            <div className="text-xs text-gray-700 dark:text-gray-300">
                Don’t have an account?
                <Link className="text-[#0077E5] dark:text-[#1A91FF] font-semibold ml-1" to={pagePaths.auth.register}>
                    Sign up
                </Link>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className={`text-center rounded-md w-full py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#292929] 
                           text-white hover:bg-[#005bb5] dark:hover:bg-[#100F0F] 
                           cursor-pointer
                           ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
            >
                {isLoading ? "Logging in..." : "Sign in"}
            </button>
        </form>
    );
};

export default LoginPage;
