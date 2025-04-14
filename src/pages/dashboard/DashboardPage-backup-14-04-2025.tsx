import { Fragment, JSX, useState } from "react";
import { ArrowUpIcon, CheckIcon, ChevronDownIcon } from "lucide-react";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle
// } from "@/components/ui/card";
import {
    ReactDropdownMenu,
    DropdownMenuContent,
    // DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/ReactDropdownMenu.tsx";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import { countryFilter } from "@/constants/filter.ts";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import OverallDashboard from '@/components/OverallDashboard'
import { ReactDatePicker } from "@/components/ui/ReactDatePicker";
import { Card, Stack } from "@mui/material";
import { CardBody } from "@/components/ui/Card";
import SalesProfitChart from "@/components/ui/SalesProfitChart";
// import SalesProfitDashboard from "@/components/SalesProfitDashboard";
// import ExpensesDashboard from "@/components/ExpensesDashboard";
// import InventoryDashboard from "@/components/InventoryDashboard";
// import ProfitLossDashboard from "@/components/ProfitLossDashboard";
// import RecentOrderDashboard from "@/components/RecentOrderDashboard";
// import TopProductDashboard from "@/components/TopProductDashboard";
// import DatePicker from "@/components/Datepicker";
// import { countryFilter } from "@/data/filter";
// import { Expense } from "@/store/useExpenseDashboardStore";
// import { Inventory } from "@/store/useInventoryDashboard";
// import { ProfitLoss } from "@/store/useProfitLossStore";
// import { RecentOrder } from "@/store/useRecentOrderDashboardStore";
// import { TopProduct } from "@/store/useTopProductDashboard";

const DashboardPage: () => JSX.Element = () => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>("All Country");

    const handleDateRangeChange = (range: string) => {

    };

    return (
        <Fragment>
            <div className="flex justify-end items-center mb-4 space-x-4">
                <div className="flex flex-wrap justify-end items-center gap-3 mb-4">
                    <ReactDatePicker onDateRangeChange={handleDateRangeChange} className="w-full md:w-auto" />

                    <ReactDropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <ReactButton variant="outline" className="w-60 justify-between">
                                {selectedCountry ? (
                                    <div className="flex items-center gap-2">
                                        {countryFilter.find((c) => c.name === selectedCountry)?.image && (
                                            <img
                                                src={countryFilter.find((c) => c.name === selectedCountry)?.image}
                                                width={20}
                                                height={14}
                                                alt={selectedCountry}
                                                className="rounded-sm shadow-md"
                                            />
                                        )}
                                        <span>{selectedCountry}</span>
                                    </div>
                                ) : (
                                    <span className="text-[#6E8091]">All Country</span>
                                )}
                                <ChevronDownIcon className="ml-2 h-5 w-5" />
                            </ReactButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="w-60 h-60 overflow-auto rounded-md shadow-lg
               bg-white border border-gray-200 text-gray-800
               dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                        >
                            {countryFilter.map((country) => (
                                <DropdownMenuItem
                                    key={country.name}
                                    onSelect={() => setSelectedCountry(country.name)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-all
                ${selectedCountry === country.name
                                            ? "bg-blue-600 text-white dark:bg-blue-500"
                                            : "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                                        }`}
                                >
                                    {country.image && (
                                        <img
                                            src={country.image}
                                            width={20}
                                            height={14}
                                            alt={country.name}
                                            className="rounded-sm shadow-md"
                                        />
                                    )}
                                    <span className="text-sm">{country.name}</span>
                                    {selectedCountry === country.name && (
                                        <CheckIcon className="h-4 w-4 text-white dark:text-gray-200 ml-auto" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </ReactDropdownMenu>
                </div>
            </div>

            <div className="grid gap-3 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <OverallDashboard className="col-span-1 md:col-span-1" />
                    <SalesProfitChart />
                    {/*<SalesProfitDashboard className="col-span-1 md:col-span-1" />*/}
                    {/*<ExpensesDashboard data={[]} className="col-span-1 md:col-span-1" />*/}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/*<RecentOrderDashboard data={[]} className="col-span-1 md:col-span-1" />*/}
                    {/*<TopProductDashboard data={[]} className="col-span-1 md:col-span-1" />*/}
                    {/*<InventoryDashboard data={[]} className="col-span-1 md:col-span-1" />*/}
                    {/*<ProfitLossDashboard data={[]} className="col-span-1 md:col-span-1" />*/}
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardPage;
