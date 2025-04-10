import { AssetsConfig } from "@/config/assetsConfig";
import { useGetPricingRulesQuery } from "@/store/api/repriceApi";
import { Box } from "@mui/material";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

const RulesPage = () => {
    const navigate = useNavigate();
    const detailMap: Record<string, string> = {
        "fixed_amount_below": "Price below by",
        "fixed_amount_above": "Price above by",
        "percentage_above": "Price above by",
        "percentage_below": "Price below by",
        "match_price": "Match price",
        "do_not_match": "Do not match price",
    }


    const { data: pricingRules, isSuccess
    } = useGetPricingRulesQuery();

    const pricingList = useMemo(() => {
        if (!isSuccess || !pricingRules?.results) return [];
        return pricingRules.results;
    }, [isSuccess, pricingRules]);

    return (
        <>
            <Box className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2 mb-6">
                    <img
                        src={AssetsConfig.icons.back.src}
                        width={20}
                        height={20}
                        alt={AssetsConfig.icons.back.alt}
                        className="cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="text-[#1E1E1E] dark:text-[#F2F2F2] font-bold text-xl">
                        Rules
                    </h1>
                </div>
                <Link to="add" className="text-[#0077E5] text-xs font-semibold cursor-pointer">
                    Add Rules
                </Link>
            </Box>

            <Box className="flex flex-wrap -m-[16px]">
                {pricingList.map((item) => (
                    <Box className="w-full max-w-[33.33%] p-[16px]" key={item.id}>
                        <Box className="border border-solid border-[#EEEEEE] rounded-lg p-4 min-h-[480px]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="font-bold text-xl leading-[150%] tracking-[-1%] text-[#1E1E1E]">
                                    {item.rule_name}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate(`edit/${item.id}`)}
                                    className="flex items-center cursor-pointer bg-[transparent]"
                                >
                                    <img src="/assets/images/editgray.svg" alt="" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="w-full">
                                    <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                                        Price Match
                                    </div>
                                    <ul className="list-disc list-outside font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] pl-4">
                                        {/* <li>
                                            If lowest price is Prime offer, then match offer price
                                        </li>
                                        <li>
                                            Do not match Prime Offers that do not have next day delivery
                                            unless no prime with next day delivery
                                        </li>
                                        <li>Do not match Non-Prime Offers</li> */}
                                        <li>If lowest price is prime, <span>{detailMap[item.prime_adjustment_type]}</span> {item.prime_adjustment_type?.includes("amount") ? " £" + item.prime_adjustment_value : item.prime_adjustment_type?.includes("percentage") ? item.prime_adjustment_value + "%" : ""}</li>
                                        <li>If lowest price is non-prime next day delivery, <span>{detailMap[item.non_prime_next_day_adjustment_type]}</span> {item.non_prime_next_day_adjustment_type?.includes("amount") ? " £" + item.non_prime_next_day_adjustment_value : item.non_prime_next_day_adjustment_type?.includes("percentage") ? item.non_prime_next_day_adjustment_value + "%" : ""}</li>
                                        <li>If lowest price is non prime, <span>{detailMap[item.non_prime_adjustment_type]} {item.non_prime_adjustment_type?.includes("amount") ? " £" + item.non_prime_adjustment_value : item.non_prime_adjustment_type?.includes("percentage") ? item.non_prime_adjustment_value + "%" : ""}</span></li>

                                    </ul>
                                </div>
                                <div className="w-full">
                                    <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                                        Price Match - Guard
                                    </div>
                                    {/* <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">Not Required</div> */}
                                    <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">{item.guard_prevent_below_prime && <span>Never undercut lowest prime</span>}</div>
                                    <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">{item.guard_prevent_below_non_prime && <span>Never undercut lowest non prime</span>}</div>
                                </div>
                                <div className="w-full">
                                    <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                                        Min/Max
                                    </div>
                                    <ul className="list-disc list-outside font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E] pl-4">
                                        {/* <li>
                                            Keep a minimum ROI of 5.00%
                                        </li>
                                        <li>There are no maximum set</li> */}
                                        {item.min_roi && <li>Minimum ROI of {item.min_roi}</li>}
                                        {item.max_roi && <li>Maximum ROI of {item.max_roi}</li>}
                                        {item.min_roi_30_days && <li>Minimum ROI of {item.min_roi_30_days} after 30 days</li>}
                                        {item.min_roi_60_days && <li>Minimum ROI of {item.min_roi_60_days} after 60 days</li>}
                                    </ul>
                                </div>
                                <div className="w-full">
                                    <div className="font-semibold text-base leading-[150%] tracking-[-1%] text-[#1E1E1E] mb-1">
                                        Exclude Sellers
                                    </div>
                                    <div className="font-normal text-sm leading-[150%] tracking-[-1%] text-[#1E1E1E]">Not Required</div>
                                </div>
                            </div>
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default RulesPage;
