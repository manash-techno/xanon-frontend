import { AssetsConfig } from '@/config/assetsConfig';
import { JSX } from 'react';
const EmailVerificationPage: () => JSX.Element = () => {
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
                />
                <h1 className="text-[#444444] dark:text-gray-100 font-bold text-xl">
                    Email Verification
                </h1>
            </div>
            <div className="flex gap-3">
                <div className="text-xs text-gray-700 dark:text-gray-300">
                    Please enter the 6-digit verification code that was sent to
                    your@emailcom
                </div>
                <button type="button" className="text-[#0077E5] text-xs">
                    Change
                </button>
            </div>
            <div className="flex flex-col gap-3 mt-auto">
                <div className="flex flex-col gap-1" />
                <div className="flex gap-2 text-xs text-[#6E8091] dark:text-[#828282]">
                    <span>Didn’t get the code?</span>
                    <button type="button">Resend (50s)</button>
                </div>
            </div>
            <button
                type="button"
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