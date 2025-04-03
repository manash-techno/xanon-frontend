import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedCountry } from "@/store/slices/shipmentSlice";
import { useGetMarketplaceCountriesQuery } from "@/store/api/countriesApi";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import { ChevronDownIcon, RefreshCwIcon, CheckIcon } from "lucide-react";
import { BarLoader } from "@/components/common/BarLoader.tsx";
import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { countryFilter } from "@/constants/filter.ts";
import { ReactNode } from "react";

export const CountryFilter = () => {
    const dispatch = useDispatch();
    const selectedCountry = useSelector((state: RootState) => state.shipment.selectedCountry);

    const {
        data: countryList,
        isFetching: isFetchingCountries,
        isError: isErrorCountries,
        refetch: refetchCountries
    } = useGetMarketplaceCountriesQuery();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ReactButton variant="outline" className="w-60 justify-between p-2.5 text-sm">
                    {selectedCountry?.country || <span className="text-[#6E8091]">All Country</span>}
                    <ChevronDownIcon className="ml-2 h-5 w-5" />
                </ReactButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="z-50 w-60 h-60 overflow-y-auto rounded-md border bg-white p-1 text-gray-900
                shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 transition-all duration-150 ease-in-out"
            >
                {(isFetchingCountries && (
                    <div className="flex items-center justify-center p-3">
                        <BarLoader color={"#0077E5"} />
                    </div>
                )) as ReactNode}

                {(isErrorCountries && (
                    <div className="flex flex-col items-center justify-center p-3 text-sm text-red-600">
                        <span>Failed to load countries</span>
                        <ReactButton onClick={refetchCountries} variant="outline" className="mt-2 flex items-center gap-1">
                            <RefreshCwIcon className="w-4 h-4 animate-spin" />
                            Reload
                        </ReactButton>
                    </div>
                )) as ReactNode}

                {(!isFetchingCountries && !isErrorCountries && (
                    <>
                        {countryList?.map((country) => (
                            <DropdownMenuItem
                                key={country.marketplace_id}
                                onClick={() => dispatch(setSelectedCountry(country))}
                                className="relative flex cursor-pointer select-none items-center justify-between rounded-md px-3 py-2 text-sm
                                outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-700
                                focus:bg-gray-200 dark:focus:bg-gray-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                                <div className="flex items-center gap-2">
                                    {countryFilter.find((item) => item.name === country.country)?.image && (
                                        <ReactImage
                                            src={countryFilter.find((item) => item.name === country.country)?.image || ""}
                                            width={20}
                                            height={15}
                                            alt={country.country}
                                            className="rounded-sm"
                                        />
                                    )}
                                    <span className="text-sm">{country.country}</span>
                                </div>
                                {selectedCountry?.country === country.country && (
                                    <CheckIcon className="h-4 w-4 text-blue-500" />
                                )}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem
                            onClick={() => dispatch(setSelectedCountry(null))}
                            className="cursor-pointer text-center font-medium px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200
                            dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                        >
                            Clear Filter
                        </DropdownMenuItem>
                    </>
                )) as ReactNode}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
