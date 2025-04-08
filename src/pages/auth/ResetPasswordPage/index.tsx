import { AssetsConfig } from "@/config/assetsConfig";
import { JSX } from "react";

const ResetPasswordPage: () => JSX.Element = () => {
    return (
        <form
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
                            placeholder="Enter Password"
                            id="password"
                            className="rounded-md px-3 py-2.5 border text-sm w-full pr-11
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                            required
                            type="password"
                        />
                        <img
                            className="absolute top-2.5 right-3 cursor-pointer dark:invert"
                            width={20}
                            height={20}
                            src={AssetsConfig.icons.eye.src}
                            alt={AssetsConfig.icons.eye.alt}
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
                            placeholder="Re-enter Password"
                            id="password"
                            className="rounded-md px-3 py-2.5 border text-sm w-full pr-11
                                       bg-white dark:bg-[#242424]
                                   border-[#EEEEEE] dark:border-[#373737]
                                   text-[#1E1E1E] dark:text-[#fff]"
                            required
                            type="password"
                        />
                        <img
                            className="absolute top-2.5 right-3 cursor-pointer dark:invert"
                            width={20}
                            height={20}
                            src={AssetsConfig.icons.eye.src}
                            alt={AssetsConfig.icons.eye.alt}
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="text-center rounded-md w-full py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#292929] 
                           text-white hover:bg-[#005bb5] dark:hover:bg-[#100F0F] 
                           cursor-pointer
                           "
            >
                Save
            </button>
        </form>
    )
}

export default ResetPasswordPage;