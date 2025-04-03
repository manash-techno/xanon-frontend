import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { ReactInput } from "@/components/ui/ReactInput.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table.tsx";
import {
    ColumnDef, flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { ChangeEvent, JSX, useMemo, useState } from "react";
import { BarLoader } from "@/components/common/BarLoader.tsx";
import { PaginationControls } from "@/components/common/PaginationControls.tsx";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import { formatShortDate, formatTime } from "@/lib/utils";
import { useGetShipmentQuery } from "@/store/api/shipmentApi";
import { setCurrentPage, setSearch } from "@/store/slices/shipmentSlice.ts";
import { RootState } from "@/store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import { ShipmentItems } from "@/types/shipmentTypes";
import { StatusFilter } from "./StatusFilter";
import { setDateRange } from "@/store/slices/shipmentSlice";
import { ReactDatePicker } from "@/components/ui/ReactDatePicker";
import { CountryFilter } from "./CountryFilter";

const ShipmentPage: () => JSX.Element = () => {
    const dispatch = useDispatch();
    const [showCogsModal, setShowCogsModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<ShipmentItems>()

    const {
        search,
        selectedStatus,
        selectedCountry,
        currentPage,
        startDate,
        endDate,
        dateRangeLabel
    } = useSelector((state: RootState) => state.shipment);

    const {
        data: shipmentData,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch: shipmentRefetch
    } = useGetShipmentQuery({
        page: currentPage,
        status: selectedStatus,
        search,
        country: selectedCountry?.marketplace_id,
        purchase_date_before: endDate,
        purchase_date_after: startDate,
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

    const shipmentItems = useMemo(() => {
        if (!isSuccess || !shipmentData?.results) return [];

        console.log('shipmentData', shipmentData)

        return shipmentData.results.map((item) => ({
            id: item.id,
            date: item.shipment_date,
            time: item.shipment_date,
            shipmentId: item.shipment_id,
            trackingId: item.tracking_id,
            image: item.items.map((data: any) => data?.image_url),
            product: item.items.map((data: any) => data?.title),
            sku: item.items.map((data: any) => data?.sku),
            asin: item.items.map((data: any) => data?.asin),
            status: item.shipment_status,
            quantity: item.items.map((data: any) => data?.quantity_shipped),
            cog: item.items.map((data: any) => data?.cost_of_goods),
            items: item.items,
            shipFrom: item.ship_from_address,
            salesChannel: item.market_place?.sales_channel,
            destinationFulfillment: item?.destination_fulfillment_center_id
        }));
    }, [shipmentData, isSuccess]);

    const columns: ColumnDef<typeof shipmentItems[0]>[] = [
        {
            accessorKey: "date",
            header: "Date",
            accessorFn: row => <div>{row?.date} </div>,
            cell: ({ row }) => <div>{formatShortDate(new Date(row.original.date))} <span className="block text-xs text-[#6E8091]">{formatTime(new Date(row.original.date))}</span></div>,
            size: 100
        },
        {
            accessorKey: "shipmentId",
            header: "Shipment ID",
            cell: ({ row }) => {
                const id = row.original.id;
                const isMoreActionsVisible = showMoreActions[id] || false;

                return (
                        <div>
                            {/* First Shipment ID */}
                            <div className="flex items-center">
                                {row.original.shipmentId}
                                <ReactImage src={AssetsConfig.icons.rightUp.src} width={20} height={20} alt={AssetsConfig.icons.rightUp.alt} />
                            </div>

                            {/* First Tracking ID */}
                            <div className="flex items-center">
                                <span className="block text-xs text-[#6E8091]">
                                    {row.original.trackingId}
                                </span>
                                <ReactImage src={AssetsConfig.icons.rightUp.src} width={20} height={20} alt={AssetsConfig.icons.rightUp.alt} />
                                {/* Show "+X" only if there are more shipment IDs */}
                                {!isMoreActionsVisible && <span
                                    className="text-sm text-[#0077E5] font-medium cursor-pointer"
                                    onClick={() => toggleMoreActions(id.toString())} // Toggle function
                                >
                                    {row.original.items.length > 1 ? `+  ${row.original.items.length - 1}` : ""}
                                </span>}
                            </div>
                        </div>
                );
            },
        },
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ row }) => {
                const id = row.original.id; // Get the row's unique ID
                const isMoreActionsVisible = showMoreActions[id] || false; // Default to false if undefined   

                return (
                    <div className="flex gap-2.5">
                        <ReactImage
                            src={row.original.image[0] || AssetsConfig.icons.defaultProductImage.src}
                            width={48} height={48}
                            alt={AssetsConfig.icons.defaultProductImage.alt}
                            className="rounded-sm w-12 h-12 object-contain"
                            fallbackSrc={AssetsConfig.icons.defaultProductImage.src}
                        />
                        {(!isMoreActionsVisible && row.original.image.length > 1) && <span className="text-sm text-[#0077E5] font-medium">+{row.original.image.length - 1}</span>}
                    </div>
                )
            },
            size: 100
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
            cell: ({ row }) => {
                return (
                    <div className="flex flex-col">
                        <span>{row.original.product[0]}</span>
                        <span className="text-xs text-[#6E8091] block">{row.original.sku[0]}</span>
                        <span className="text-xs text-[#6E8091] block">{row.original.asin[0]}</span>
                    </div>
                )
            },
            size: 500
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <div>{row.original.status}<span className="text-xs text-[#6E8091] block">{row.original.salesChannel}</span></div>
                )
            },
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
            cell: ({ row }) => {
                return (
                    <div>{row.original.quantity[0]}</div>
                )
            }
        },
        {
            accessorKey: "cog",
            header: () => <div className="text-right">COG</div>,
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.cog[0] && row.original.cog[0] != null ? (
                            <div className="text-right">£{row.original.cog[0]}</div>
                        ) : (
                            <div className="text-right text-sm text-[#0077E5] cursor-pointer" onClick={() => { setShowCogsModal(true); setSelectedItem(row.original.items[0]) }}>Add COG</div>
                        )}
                    </>
                );
            },
        }
        ,
        {
            id: "actions",
            header: "Action",
            enableHiding: false,
            cell: ({ row }) => {
                const id = row.original.id;
                const isMoreActionsVisible = showMoreActions[id];

                return (
                    <>
                        <div className="flex flex-col">
                            {row.original.cog[0] != "" && <span className="flex items-center text-[#0077E5] cursor-pointer" onClick={() => { setShowCogsModal(true); setSelectedItem(row.original.items[0]) }}>Edit COG</span>}
                            <span
                                className="flex items-center cursor-pointer"
                                onClick={() => toggleMoreActions(id.toString())}
                            >
                                {isMoreActionsVisible ? "Less" : "More"} <ReactImage src={isMoreActionsVisible ? AssetsConfig.icons.chevronUp.src : AssetsConfig.icons.chevronDown.src} alt={isMoreActionsVisible ? AssetsConfig.icons.chevronUp.alt : AssetsConfig.icons.chevronDown.alt} width={16} height={16} />
                            </span>
                        </div>
                    </>
                );
            },
        },
    ];

    const table = useReactTable({
        data: shipmentItems,
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
            <div className="relative mb-4 w-60">
                <div className="absolute -translate-y-2/4 top-2/4 left-3">
                    <ReactImage src={AssetsConfig.icons.search.src} alt={AssetsConfig.icons.search.alt} width={16} height={16} />
                </div>
                <ReactInput placeholder="Search shipment" value={search} onChange={handleSearchEvent} className="w-full h-10 pl-10 text-sm" />
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
                    {/* <FulfillmentFilter /> */}
                  </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                {isError && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-md flex items-center">
                        <span>
                            Error fetching Shipment
                        </span>
                        <ReactButton
                            variant="outline"
                            className="ml-4 text-red-700 border-red-400 hover:bg-red-200"
                            onClick={() => shipmentRefetch()}
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
                            table.getRowModel().rows.map((row) => (<>
                                <TableRow key={row.id} className={showMoreActions[row.original.id] ? "border-b-0" : ""}>{row.getVisibleCells().map((cell) => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>
                                {showMoreActions[row.original.id] && (
                                    <TableRow className="border-t-0">
                                        <TableCell>&nbsp;</TableCell>
                                        <TableCell colSpan={2}>
                                            <p>Ship from</p>
                                            <p className="text-[#6E8091] text-xs">
                                                {row.original.shipFrom.Name} <br />
                                                {row.original.shipFrom.AddressLine1} <br />
                                                {row.original.shipFrom.City}, {row.original.shipFrom.StateOrProvinceCode} {row.original.shipFrom.PostalCode} {row.original.shipFrom.CountryCode}<br />
                                            </p>
                                        </TableCell>
                                        <TableCell className="align-top">
                                            <p>Ship to</p>
                                            <p className="text-[#6E8091] text-xs">
                                                {row.original.destinationFulfillment}
                                            </p>
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

            <PaginationControls currentPage={currentPage} onPageChange={(page) => dispatch(setCurrentPage(page))} totalPages={shipmentData?.count ? Math.ceil(shipmentData.count / 10) : 1} />
        </div>
    );
};

export default ShipmentPage;
