import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedStatus } from "@/store/slices/shipmentSlice";
import { shipmentStatusList, EnumShipmentStatus } from "@/constants/filter.ts";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import { ChevronDownIcon } from "lucide-react";

export const StatusFilter = () => {
    const dispatch = useDispatch();
    const selectedStatus = useSelector((state: RootState) => state.shipment.selectedStatus) || EnumShipmentStatus.All;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ReactButton variant="outline" className="w-60 justify-between p-2.5 text-sm">
                    {shipmentStatusList.find(status => status.value === selectedStatus)?.name || "All status"}
                    <ChevronDownIcon className="ml-2 h-5 w-5" />
                </ReactButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="z-50 w-60 h-60 overflow-y-auto rounded-md border
                bg-white p-1 text-gray-900 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
                transition-all duration-150 ease-in-out"
            >
                <>
                    {shipmentStatusList.map((status) => (
                        <DropdownMenuItem
                            key={status.value}
                            onClick={() => dispatch(setSelectedStatus(status.value))}
                            className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm 
                            outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-800 
                            data-[disabled]:pointer-events-none data-[disabled]:opacity-50 
                            ${selectedStatus === status.value ? "bg-blue-500 text-white dark:bg-blue-600" : ""}`}
                        >
                            {status.name}
                        </DropdownMenuItem>
                    ))}
                </>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
