import { AssetsConfig } from '@/config/assetsConfig';
import { JSX } from 'react';
const SubscriptionPage: () => JSX.Element = () => {
    return (
        <div
            className="p-8 rounded-2xl w-[350px] sm:w-[600px] flex flex-col gap-1
                       bg-white text-gray-900 shadow-md
                       dark:bg-[#242424] dark:text-gray-100 dark:shadow-lg min-h-[400px]"
        >
            <div className="flex flex-col gap-2 mb-6 text-center">
                <h1 className="font-bold text-2xl leading-[150%] text-[#000000] dark:text-[#F2F2F2]">
                    Grow Your Amazon Business. Start{" "}
                    <span className="text-[#0077E5]">FREE</span>
                </h1>
                <h4 className="font-normal text-sm leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                    Thrive Your Amazon Business to the next level . No Credit card info
                    required
                </h4>
                <div className="flex justify-center items-center gap-4">
                    <div className="flex bg-[#F0F0F0] dark:bg-[#1E1E1E] rounded-md p-1">
                        <button
                            type="button"
                            className="w-[87px] h-[40px] rounded-md text-[#6E8091] text[14px] cursor-pointer dark:text-[#828282]"
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            className="w-[87px] h-[40px] rounded-md text-[#1E1E1E] text[14px] bg-[#FFFFFF] cursor-pointer dark:text-[#F2F2F2] dark:bg-[#292929]"
                        >
                            Annually
                        </button>
                    </div>
                    <div className="text-[#1A91FF] text-xs font-semibold">17% Off</div>
                </div>
            </div>

            <div className="p-6 rounded-xl border border-[#EEEEEE] w-full max-w-[360px] mx-auto dark:border-[#373737]">
                <h2 className="text-[20px] font-bold text-[#1E1E1E] dark:text-[#F2F2F2]">Pro</h2>
                <h5 className="text-xs font-normal text-[#6E8091] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                    Essential tools for Amazon sellers of all sizes.
                </h5>
                <div className="flex gap-2 items-center">
                    <div className="text-[#0077E5] font-semibold text-[26.67px] leading-[140%] pt-3">
                        £17
                    </div>
                    <div className="flex flex-col mt-3">
                        <h5 className="text-xs font-normal text-[#1E1E1E] leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                            GBP/month (excl VAT)
                        </h5>
                        <h5 className="text-xs font-normal text-[#6E8091] leading-[150%] tracking-[-1%] dark:text-[#828282]">
                            billed annually
                        </h5>
                    </div>
                </div>
                <div className="flex my-4">
                    <div
                        className="text-center rounded-sm w-full max-w-[200px] py-3 font-semibold text-sm 
                           bg-[#0077E5] dark:bg-[#1A91FF] 
                           text-white"
                    >
                        FREE 14 Day Trial
                    </div>
                </div>
                <div>
                    <h4 className="text-[#191B1E] dark:text-[#F2F2F2] font-bold text-sm leading-[150%] tracking-[-1%]">
                        Pro plan includes
                </h4>   

                    <div className="flex flex-col gap-1 mt-2">
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Sales History Reports
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Order History Reports
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Reimbursements
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Live Analytics Dashboard
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Customer Support
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Inventory Management
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                1 User Account Limit
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Data Export
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Expense Tracker
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Restock Alerts
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <img
                                src={AssetsConfig.icons.check.src}
                                className="flex-[0_0_auto]"
                                alt={AssetsConfig.icons.check.alt}
                            />
                            <div className="text-[#191B1E] font-normal text-xs leading-[150%] tracking-[-1%] dark:text-[#F2F2F2]">
                                Adds-on
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPage;