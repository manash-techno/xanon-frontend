import { ChangeEvent, Fragment, JSX, useEffect, useMemo, useState } from "react";
import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { ReactInput } from "@/components/ui/ReactInput.tsx";
import { ChevronDownIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table.tsx";
import {
    ColumnDef, flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { useGetInventoryQuery } from "@/store/api/inventoryApi.ts";
import { RootState } from "@/store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setSearch } from "@/store/slices/inventorySlice.ts";
import { BarLoader } from "@/components/common/BarLoader.tsx";
import { PaginationControls } from "@/components/common/PaginationControls.tsx";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import CaretSortIcon from "@/components/ui/CaretSortIcon.tsx";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import { CountryFilter } from "./CountryFilter";
import { StatusFilter } from "./StatusFilter";
import { Link } from "react-router-dom";
import { pagePaths } from "@/config/pagePaths";

const InventoryPage: () => JSX.Element = () => {
    const dispatch = useDispatch();

    const {
        search,
        selectedStatus,
        selectedCountry,
        currentPage,
    } = useSelector((state: RootState) => state.inventory);

    const {
        data: inventoryData,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch: inventoryRefetch
    } = useGetInventoryQuery({
        page: currentPage,
        status: selectedStatus,
        search,
        country: selectedCountry?.marketplace_id,
    });

    const [showMoreActions, setShowMoreActions] = useState<{ [key: string]: boolean }>({});

    const toggleMoreActions = (id: string) => {
        setShowMoreActions((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const parseValue = <T,>(
        data: T | undefined | null,
        fallback: T | undefined = undefined
    ): T | undefined => {
        if (data === undefined || data === null || data === '') {
            return fallback;
        }
        return data;
    };

    const inventoryItems = useMemo(() => {
        if (!isSuccess || !inventoryData?.results) return [];

        return inventoryData.results.map((item) => ({
            id: item.id ?? 0,
            image_url: item.image_url?.trim() || AssetsConfig.icons.defaultProductImage.src,
            title: parseValue(item.title, "Unknown Product"),
            sku: parseValue(item.sku, "N/A"),
            asin: parseValue(item.asin, "N/A"),
            condition: parseValue(item.condition, "Unknown"),
            status: parseValue(item.status, "Unknown"),
            totalQuantity: parseValue(item.total_quantity, 0),
            inboundQuantity: parseValue(item.inbound_quantity, 0),
            fc_processing_quantity: parseValue(item.fc_processing_quantity, 0),
            position: parseValue(item.position, "N/A"),
            buyBoxPrice: parseValue(item.buy_box_price, "0"),
            buy_box_last_seen: parseValue(item.buy_box_last_seen, "N/A"),
            lastOrderDate: parseValue(item.last_order_date, "N/A"),
            sales_channel: parseValue(item.market_place?.sales_channel, 'N/A'),
            marketplace_country: parseValue(item.market_place?.country, null),
            price: parseValue(item.price, 0),
            costOfGoods: parseValue(item.cost_of_goods, "0"),
            fees: parseValue(item.fees, "0"),
            vat: parseValue(item.vat, "0"),
            profit: parseValue(item.profit, "0"),
            roi: parseValue(item.roi, "0"),
            margin: parseValue(item.margin, "0"),
        }));
    }, [inventoryData, isSuccess]);

    const columns: ColumnDef<typeof inventoryItems[0]>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => (
                <ReactImage
                    src={row.original.image_url}
                    width={48}
                    height={48}
                    alt="product"
                    className="rounded-sm w-12 h-12 object-contain"
                    fallbackSrc={AssetsConfig.icons.defaultProductImage.src}
                />
            ),
            size: 80,
        },
        {
            accessorKey: "product",
            header: ({ column }) => {
                return (
                    <ReactButton
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="flex items-center text-left gap-1 p-0"
                    >
                        <div>
                            <span className="block">Product</span>
                            <span className="block !text-[#6E8091] text-xs">SKU - ASIN</span>
                        </div>
                        <CaretSortIcon
                            className="ml-2 h-4 w-4"
                            isSorted={column.getIsSorted()}
                        />
                    </ReactButton>
                )
            },
            cell: ({ row }) => (
                <div>
                    <div className="line-clamp-2">{row.original.title}</div>
                    <div className="line-clamp-2">
                        <span className="text-xs text-[#6E8091] block">{row.original.sku}</span>
                        <span className="text-xs text-[#6E8091] block">{row.original.asin}</span>
                    </div>
                </div>
            ),
            size: 300
        },
        {
            accessorKey: "condition",
            header: () => {
                return (
                    <div
                    >
                        <span className="block">Condition</span>
                        <span className="block !text-[#6E8091] text-xs">Category</span>
                    </div>
                )
            },
            cell: ({ row }) => (
                <div>
                    <div>{row.getValue("condition") == "NewItem" ? "New" : row.getValue("condition")}</div>
                    <span className="text-xs text-[#6E8091]">{row.original.category}</span>
                </div>
            ),
            size: 100
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div>
                    <div className="capitalize">{row.original?.status?.replaceAll("_", " ")}</div>
                    <span className="text-xs text-[#6E8091]">{row.original.sales_channel}</span>
                </div>
            ),
            size: 100
        },
        {
            accessorKey: "amount",
            header: () => <div>Available</div>,
            cell: ({ row }) => {
                const id = row.original.id;
                const isMoreActionsVisible = showMoreActions[id];

                return <div>
                    <div className="flex justify-between">
                        <span>Total</span>
                        <span>{row.original.total_quantity}</span>
                    </div>
                    <div className="text-right">
                        <div className="flex justify-between text-xs text-[#6E8091]">
                            <span>Available</span>
                            <span>{row.original.inbound_quantity}</span>
                        </div>
                        <div className="flex justify-between text-xs text-[#6E8091]">
                            <span>Inbound</span>
                            <span>{row.original.inbound_quantity}</span>
                        </div>
                        {
                            isMoreActionsVisible &&
                            <>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Processing</span>
                                    <span>{row.original.fc_processing_quantity}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Buy box Price</span>
                                    <span>£{row.original.buy_box_price}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Position</span>
                                    <span>{row.original.position} ({row.original.position})</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Buy box Last Seen</span>
                                    <span>{row.original.buy_box_last_seen ? row.original.buy_box_last_seen : ""} <br />{row.original.buy_box_last_seen ? row.original.buy_box_last_seen : ""}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Last Order</span>
                                    <span>{row.original.lastOrderDate ? row.original.lastOrderDate : ""} <br />{row.original.lastOrderDate ? row.original.lastOrderDate : ""}</span>
                                </div>
                            </>
                        }
                    </div>
                </div>;
            },
            size: 180
        },
        /*{
            accessorKey: "totalQuantity",
            header: "Total Quantity",
            cell: ({ row }) => <div>{row.getValue("totalQuantity")}</div>,
            size: 100,
        },*/
        {
            accessorKey: "price",
            header: "Your Price",
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
                                    <span>£{row.original?.cost_of_goods}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Fees</span>
                                    <span>£{row.original.fees}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>VAT</span>
                                    <span>£{row.original.vat}</span>
                                </div>
                                <div className="flex justify-between text-xs text-[#6E8091]">
                                    <span>Profit</span>
                                    <span>£{row.original.profit}</span>
                                </div>
                            </>
                        }
                        <div className="flex justify-between text-xs text-[#6E8091]">
                            <span>ROI</span>
                            <span>{row.original.roi}%</span>
                        </div>
                        {
                            isMoreActionsVisible &&
                            <div className="flex justify-between text-xs text-[#6E8091]">
                                <span>Margin</span>
                                <span>{row.original.margin}%</span>
                            </div>
                        }
                    </div>
                )
            },
            size: 100,
        },
        {
            accessorKey: "roi",
            header: "ROI",
            cell: ({ row }) => <div>{row.getValue("roi")}%</div>,
            size: 100,
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const id = row.original.orderId;
                const isMoreActionsVisible = showMoreActions[id];

                return (
                    <div className="flex flex-col">
                        <span className="flex items-center text-[#0077E5]">
                            Invoice{" "}
                            <ReactImage
                                src={AssetsConfig.icons.arrowUpRightOrange.src}
                                width={20}
                                height={20}
                                alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                            />
                        </span>
                        <span className="flex items-center text-[#0077E5]">
                            Listing{" "}
                            <ReactImage
                                src={AssetsConfig.icons.arrowUpRightOrange.src}
                                width={20}
                                height={20}
                                alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                            />
                        </span>
                        {isMoreActionsVisible && (
                            <Fragment>
                                <span
                                    className="flex items-center text-[#0077E5] cursor-pointer">
                                    Notepad
                                </span>
                                <Link to={`${pagePaths.dashboard.inventoryDetails}}`} replace>
                                    <span className="flex items-center text-[#0077E5]">
                                        Inventory
                                    </span>
                                </Link>
                            </Fragment>
                        )}
                        <span
                            className="flex items-center cursor-pointer"
                            onClick={() => toggleMoreActions(id)}
                        >
                            {isMoreActionsVisible ? "Less" : "More"}
                            <ReactImage
                                src={isMoreActionsVisible ? AssetsConfig.icons.chevronUp.src : AssetsConfig.icons.chevronDown.src}
                                alt={isMoreActionsVisible ? AssetsConfig.icons.chevronUp.alt : AssetsConfig.icons.chevronDown.alt}
                                width={16}
                                height={16} />
                        </span>
                    </div>
                );
            },
            size: 100,
        },
    ];

    const table = useReactTable({
        data: inventoryItems,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleSearchEvent = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCurrentPage(1));
        dispatch(setSearch(e.target.value));
    };

    return (
        <div className="w-full">
            <div className="relative mb-4 w-60">
                <div className="absolute -translate-y-2/4 top-2/4 left-3">
                    <ReactImage src={AssetsConfig.icons.search.src} alt={AssetsConfig.icons.search.alt} width={16} height={16} />
                </div>
                <ReactInput placeholder="Search inventory" value={search} onChange={handleSearchEvent} className="w-full h-10 pl-10 text-sm" />
            </div>

            <div className="flex items-center mb-6 space-x-5">
                <StatusFilter />
                <CountryFilter />
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                {isError && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-md flex items-center">
                        <span>
                            Error fetching inventory
                        </span>
                        <ReactButton
                            variant="outline"
                            className="ml-4 text-red-700 border-red-400 hover:bg-red-200"
                            onClick={() => inventoryRefetch()}
                        >
                            Retry
                        </ReactButton>
                    </div>
                )}

                <Table className="min-w-full">
                    <TableHeader className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="p-3">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>{row.getVisibleCells().map((cell) => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>
                            ))
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

            <PaginationControls currentPage={currentPage} onPageChange={(page) => dispatch(setCurrentPage(page))} totalPages={inventoryData?.count ? Math.ceil(inventoryData.count / 10) : 1} />
        </div>
    );
};

export default InventoryPage;
