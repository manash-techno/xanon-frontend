import { FormEvent, JSX, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/store/api/authApi.ts";
import {AssetsConfig} from "@/config/assetsConfig.ts";
import {pagePaths} from "@/config/pagePaths.ts";
import {AuthFormWrapper} from "@/components/AuthFormWrapper.tsx";
import { useDispatch, useSelector } from "react-redux";
import {setUserId, setRegisterEmail} from "@/store/slices/registerSlice";
import { RootState } from "@/store/store";

const RegisterPage: () => JSX.Element = () => {
    const navigate = useNavigate();
    const dispacth = useDispatch();
    const userEmail = useSelector((state: RootState) => state.register.userEmail); 

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConPassword, setShowConPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setError(null);
        setMessage(null);
    }, []);

    useEffect(() => {
      setEmail(userEmail || "");  
    }, [userEmail]);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        // Basic validation
        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await register({ username, email, password }).unwrap();
            dispacth(setUserId(res.id));
            dispacth(setRegisterEmail(res.email));

            // dispatch(setCredentials({ token: response.access, refresh: response.refresh }));

            setMessage("Registration successful! Redirecting to Email Verification...");
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setTimeout(() => navigate(pagePaths.auth.emailVerification), 2000); // Redirect after success
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
        <AuthFormWrapper onSubmit={handleRegister}>
            <img className="mx-auto" src={AssetsConfig.images.branding.logoSingle.src} width={60} height={60} alt={AssetsConfig.images.branding.logoSingle.alt}/>
            <h1 className="text-[#15355E] dark:text-[#F2F2F2] font-bold text-xl">Sign Up</h1>

            {/* Success & Error Messages */}
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
                {/* Username Input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-xs text-gray-700 dark:text-[#F2F2F2]">Username</label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        id="username"
                        className="rounded-md px-3 py-2.5 border text-sm
                                   bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

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
                    <label htmlFor="password" className="text-xs text-gray-700 dark:text-[#F2F2F2]">Create
                        Password</label>
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
                            src={showPassword ? AssetsConfig.icons.eyeOff.src : AssetsConfig.icons.eye.src}
                            width={20}
                            height={20}
                            alt={AssetsConfig.icons.eye.alt}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                </div>

                {/* Confirm Password Input */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="confirmPassword" className="text-xs text-gray-700 dark:text-[#F2F2F2]">Confirm
                        Password</label>
                    <div className="relative">
                        <input
                            type={showConPassword ? "text" : "password"}
                            placeholder="Re-enter Password"
                            id="confirmPassword"
                            className="rounded-md px-3 py-2.5 border text-sm w-full pr-11
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
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
                {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            {/* Links: Login & Forgot Password */}
            <div className="text-xs text-center text-gray-700 dark:text-[#F2F2F2]">
                Already have an account?
                <Link className="text-[#0077E5] dark:text-[#1A91FF] font-semibold ml-1" to={pagePaths.auth.login}>Sign in</Link>
                <br/>
                <Link className="text-[#0077E5] dark:text-[#1A91FF] font-semibold" to={pagePaths.auth.forgetPassword}>Forgot
                    Password?</Link>
            </div>
        </AuthFormWrapper>
    );
};

export default RegisterPage;
