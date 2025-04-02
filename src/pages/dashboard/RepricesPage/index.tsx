import { BarLoader } from "@/components/common/BarLoader.tsx";
import { PaginationControls } from "@/components/common/PaginationControls.tsx";
import { ReactDatePicker } from "@/components/ui/ReactDatePicker";
import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { ReactInput } from "@/components/ui/ReactInput.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table.tsx";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import { formatShortDate, formatTime } from "@/lib/utils.ts";
import { FulfillmentFilter } from "@/pages/dashboard/RepricesPage/FulfillmentFilter.tsx";
import { CountryFilter } from "@/pages/dashboard/RepricesPage/CountryFilter.tsx";
import { StatusFilter } from "@/pages/dashboard/RepricesPage/StatusFilter.tsx";
import { useGetRepricesQuery } from "@/store/api/repriceApi";
import {
    setCurrentPage,
    setDateRange,
    setSearch,
} from "@/store/slices/repriceSlice.ts";
import { RootState } from "@/store/store.ts";

import { countryFilter } from "@/constants/filter";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChangeEvent, JSX, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RepriceOverview from "./RepriceOverview";

const RepricesPage: () => JSX.Element = () => {
    const dispatch = useDispatch();

    const {
        search,
        selectedStatus,
        selectedCountry,
        startDate,
        endDate,
        fulfillmentChannel,
        currentPage,
        dateRangeLabel,
    } = useSelector((state: RootState) => state.reprice);

    const {
        data: repriceData,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetRepricesQuery({
        page: currentPage,
        order_status: selectedStatus,
        purchase_date_before: endDate,
        purchase_date_after: startDate,
        search,
        country: selectedCountry?.marketplace_id,
        fulfillmentChannel,
    });

    const [showMoreActions, setShowMoreActions] = useState<{
        [key: string]: boolean;
    }>({});

    const [selectedRepriceRule, setSelectedRepriceRule] = useState<Record<string, string | null>>({});


    // Toggle More/Less actions
    const toggleMoreActions = (id: string) => {
        setShowMoreActions((prev) => ({ ...prev, [id]: !prev[id] }));
        setSelectedRepriceRule((prev) => ({
            ...prev,
            [id]: "Price"
        }));
    };

    const reprices = useMemo(() => {
        if (!isSuccess || !repriceData?.results) return [];

        console.log('repriceData', repriceData)

        return repriceData.results.map((item) => ({
            ...item,
        }));
    }, [repriceData, isSuccess]);

    const columns: ColumnDef<typeof reprices[0]>[] = [
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => <div>{formatShortDate(new Date(row.original.created_at))} <span className="block text-xs text-[#6E8091]">{formatTime(new Date(row.original.created_at))}</span></div>,
        },
        {
            accessorKey: "rule",
            header: "Rule",
            cell: ({ row }) => <div>{row.getValue("rule")}</div>
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) =>
                <ReactImage
                    src={row.original.image_url || AssetsConfig.icons.defaultProductImage.src}
                    width={48} height={48}
                    alt={AssetsConfig.icons.defaultProductImage.alt}
                    className="rounded-sm w-12 h-12 object-contain"
                    fallbackSrc={AssetsConfig.icons.defaultProductImage.src}
                />
        },
        {
            accessorKey: "product",
            header: () => {
                return (
                    <div
                        className="flex flex-col items-start p-0"
                    >
                        <span className="block">Product</span>
                        <span className="block !text-[#6E8091] text-xs">SKU - ASIN</span>
                    </div>
                )
            },
            cell: ({ row }) => (
                <div>
                    {row.original.title}
                    <span className="text-xs text-[#6E8091] block">{row.original.sku}</span>
                    <span className="text-xs text-[#6E8091] block">{row.original.asin}</span>
                </div>
            ),
            size: 300
        },
        {
            accessorKey: "country",
            header: () => "Country",
            cell: ({ row }) => (
                <div className="flex gap-1 justify-center items-center">
                    <ReactImage
                        src={countryFilter.find((item) => item.name == row.original.market_place.country)?.image || "/box.png"}
                        width={24}
                        height={24}
                        alt="flag"
                    />
                    <span>{row.original.market_place.country}</span>
                </div>
            ),
            size: 50
        },
        {
            accessorKey: "oldPrice",
            header: () => <div className="text-right">Old Price</div>,
            cell: ({ row }) => <div className="text-right">£{row.original.old_price}</div>,
            size: 100
        },
        {
            accessorKey: "currPrice",
            header: () => <div className="text-right">Current Price</div>,
            cell: ({ row }) => {
                const id = row.original.id;
                const isMoreActionsVisible = showMoreActions[id];
                return (
                    <div className="text-right">
                        <span>£{row.original.price}</span>
                        {isMoreActionsVisible &&
                            <>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>CoG</span>
                                    <span>£{row.original.cog}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Fees</span>
                                    <span>£{row.original.fees}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Profit</span>
                                    <span>£{row.original.profit}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>ROI</span>
                                    <span>{row.original.roi}%</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Margin</span>
                                    <span>{row.original.margin}%</span>
                                </div>
                            </>
                        }
                    </div>
                )
            }

        },
        {
            accessorKey: "change",
            header: () => <div className="text-right">Change</div>,
            cell: ({ row }) =>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center">
                        <span>£{parseFloat(row.original.price || "0") - parseFloat(row.original.old_price || "0")}</span>
                        <ReactImage
                            src={AssetsConfig.icons.arrowUpGreen.src}
                            width={24}
                            height={24}
                            alt={AssetsConfig.icons.arrowUpGreen.alt}
                        />
                    </div>
                    {/* <CustomSwitchButton /> */}
                </div>,
            size: 100
        },
        {
            id: "actions",
            header: "Action",
            enableHiding: false,
            cell: ({ row }) => {
                const id = row.original.id;
                const isMoreActionsVisible = showMoreActions[id];

                return (
                    <div className="flex flex-col">
                        <Link to={"/reprice/detail"}>
                            <span className="flex items-center text-[#0077E5]">Reprice</span>
                        </Link>
                        <span
                            className="flex items-center cursor-pointer"
                            onClick={() => toggleMoreActions(id)}
                        >
                            {isMoreActionsVisible ? "Less" : "More"} <ReactImage src={isMoreActionsVisible ? AssetsConfig.icons.chevronUp.src : AssetsConfig.icons.chevronDown.src} alt={isMoreActionsVisible ? AssetsConfig.icons.chevronUp.alt : AssetsConfig.icons.chevronDown.alt} width={16} height={16} />
                        </span>
                    </div>
                );
            },
            size: 80
        },
    ];

    const table = useReactTable({
        data: reprices,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleSearchEvent = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentPage(1));
        dispatch(setSearch(e.target.value));
    };
    const handleDateRangeChange = (value: {
        from: string | null;
        to: string | null;
        label: string | null;
    }) => {
        dispatch(
            setDateRange({
                startDate: value.from,
                endDate: value.to,
                label: value.label,
            })
        );
    };

    return (
        <div className="w-full">
            <RepriceOverview />
            <div className="relative mb-4 w-60">

                <div className="absolute -translate-y-2/4 top-2/4 left-3">
                    <ReactImage
                        src={AssetsConfig.icons.search.src}
                        width={16}
                        height={16}
                        alt={AssetsConfig.icons.search.alt}
                    />
                </div>
                <ReactInput
                    placeholder="Search reprice"
                    value={search}
                    onChange={handleSearchEvent}
                    className="w-full h-10 pl-10 text-sm"
                />
            </div>

            <div className="flex items-center mb-6 space-x-5">
                {/* Filter by Date */}
                <ReactDatePicker
                    onDateRangeChange={handleDateRangeChange}
                    from={startDate}
                    to={endDate}
                    label={dateRangeLabel}
                />

                {/* Filter by Status */}
                <StatusFilter />

                {/* Filter by Country */}
                <CountryFilter />

                {/* Filter by Fulfillment */}
                <FulfillmentFilter />
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                {/* Handle errors */}
                {isError && (
                    <div className="p-4 rounded-md text-sm font-medium flex items-center space-x-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
                        <span>❌</span>
                        <span>
                            Error fetching reprices:{" "}
                            {error instanceof Error ? error.message : "Unknown error"}
                        </span>
                    </div>
                )}

                <Table className="min-w-full">
                    <TableHeader className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="p-3">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isFetching ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    <BarLoader color={"#0077E5"} />
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (<>
                                <TableRow key={row.id} className={showMoreActions[row.original.id] ? "border-b-0" : ""}>{row.getVisibleCells().map((cell) => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>
                                {showMoreActions[row.original.id] && (
                                    <TableRow className="border-t-0">
                                        <TableCell>&nbsp;</TableCell>
                                        <TableCell colSpan={2}>
                                            &nbsp;
                                        </TableCell>
                                        <TableCell className="align-top">
                                            &nbsp;
                                            Select menu to be added
                                        </TableCell>
                                        <TableCell colSpan={5}>
                                            &nbsp;
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <PaginationControls
                currentPage={currentPage}
                onPageChange={(page) => dispatch(setCurrentPage(page))}
                totalPages={repriceData?.count ? Math.ceil(repriceData.count / 10) : 1}
            />
        </div>
    );
};

export default RepricesPage;
