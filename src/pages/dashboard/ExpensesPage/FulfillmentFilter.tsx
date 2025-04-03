import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setFulfillmentChannel } from "@/store/slices/expensesSlice";
import { enumFulfillmentTab, fulfillmentTabLabels } from "@/constants/fulfillmentTab.ts";

export const FulfillmentFilter = () => {
    const dispatch = useDispatch();
    const selectedTab = useSelector((state: RootState) => state.expenses.fulfillmentChannel);

    const handleTabClick = (tab: enumFulfillmentTab) => {
        dispatch(setFulfillmentChannel(tab));
    };

    return (
        <div className="flex rounded-md bg-[#FAFAFA] dark:bg-[#1E1E1E] p-0">
            {Object.values(enumFulfillmentTab).map((tab: enumFulfillmentTab) => (
                <button
                    key={tab}
                    className={`w-20 h-10 flex items-center justify-center text-sm font-medium rounded-md transition-colors cursor-pointer
                        ${
                        selectedTab === tab
                            ? "bg-[#E5F3FF] text-[#0077E5] dark:bg-[#00213D] dark:text-[#1A91FF]"
                            : "text-[#6E8091] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
                    }`}
                    onClick={() => handleTabClick(tab)}
                >
                    {fulfillmentTabLabels[tab]}
                </button>
            ))}
        </div>
    );
};
