import OTPInput from '@/components/OTPInput';
import { AssetsConfig } from '@/config/assetsConfig';
import { pagePaths } from '@/config/pagePaths';
import { useVerifyOTPMutation } from '@/store/api/authApi';
import { resetRegisterState } from '@/store/slices/registerSlice';
import { RootState } from '@/store/store';
import { FormEvent, JSX, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
const EmailVerificationPage: () => JSX.Element = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [verifyOTP, { isLoading }] = useVerifyOTPMutation()
    const { otp, userId, userEmail } = useSelector((state: RootState) => state.register);

    if (userId === null || userEmail === null) {
        return <Navigate to={pagePaths.auth.register} />;
    }

    useEffect(() => {
        setError(null);
    }, [otp]);

    const handleSubmit = async (e: FormEvent) => {
        // e.preventDefault();
        setError(null);
        setMessage(null);

        if (
            otp?.toString().length !== 6
        ) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            const res = await verifyOTP({ user_id: userId!.toString(), otp_code: otp!.toString() }).unwrap()

            if ("message" in res) {
                setMessage(res.message);
            }
            setTimeout(() => {
                navigate(pagePaths.auth.login)
                dispatch(resetRegisterState());
            } , 2000); // Redirect after success

        } catch (err: unknown) {
            console.log("err => ", { err })
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }


    return (
        <form
            className="p-8 rounded-2xl w-96 flex flex-col gap-6
                       bg-white text-gray-900 shadow-md
                       dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg min-h-[400px]"
        >
            <div className="flex items-center gap-2 mb-6">
                <img
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    src={AssetsConfig.icons.back.src}
                    alt={AssetsConfig.icons.back.alt}
                    onClick={() => {
                        navigate(pagePaths.auth.register);
                    }}
                />
                <h1 className="text-[#444444] dark:text-gray-100 font-bold text-xl">
                    Email Verification
                </h1>
            </div>
            
            <div className="flex gap-3">
                <div className="text-xs text-gray-700 dark:text-gray-300">
                    Please enter the 6-digit verification code that was sent to
                    {" "}{userEmail}
                </div>
                <button type="button" className="text-[#0077E5] text-xs cursor-pointer"
                    onClick={() => {
                        navigate(pagePaths.auth.register);
                    }}
                >
                    Change
                </button>
            </div>

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

            <OTPInput />

            <div className="flex flex-col gap-3 mt-auto">
                <div className="flex flex-col gap-1" />
                <div className="flex gap-2 text-xs text-[#6E8091] dark:text-[#828282]">
                    <span>Didn’t get the code?</span>
                    <button type="button">Resend (50s)</button>
                </div>
            </div>
            <button
                type="button"
                onClick={(e) => {
                    handleSubmit()
                }}
                className="text-center rounded-md w-full py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#005bb5] 
                           text-white hover:bg-[#005bb5] dark:hover:bg-[#003f80] 
                            "
            >
                Submit
            </button>
        </form>
    )
}

export default EmailVerificationPage;