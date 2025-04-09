import { BarLoader } from '@/components/common/BarLoader';
import { ReactImage } from '@/components/ui/ReactImage';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table.tsx";
import { AssetsConfig } from '@/config/assetsConfig';
import { formatShortDate, formatTime } from '@/lib/utils';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Fragment } from 'react';

interface InvetoryDetailsReplenishmentsPageProps {
    shipmentItems: Array<any>; // Replace with your actual order type
    isFetching: boolean; // Add this prop to indicate loading state
    isError: boolean;
    error: FetchBaseQueryError | SerializedError | undefined
}

const InvetoryDetailsReplenishmentsPage: React.FC<InvetoryDetailsReplenishmentsPageProps> = ({ shipmentItems, isFetching, isError, error }) => {

        const columns: ColumnDef<typeof shipmentItems[0]>[] = [
            {
                accessorKey: "date",
                header: "Date",
                accessorFn: row => <div>{row?.date} </div>,
                cell: ({ row }) => <div className="w-[100px]">{formatShortDate(new Date(row.original.date))} <span className="block text-xs text-[#6E8091]">{formatTime(new Date(row.original.date))}</span></div>,
                size: 100
            },
            {
                accessorKey: "shipmentId",
                header: "Shipment ID",
                cell: ({ row }) => {
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
                                        {row.original.trackingId || "xxx-xxx-xxxxx"}
                                    </span>
                                    <ReactImage src={AssetsConfig.icons.rightUp.src} width={20} height={20} alt={AssetsConfig.icons.rightUp.alt} />
                                </div>
                            </div>
                    );
                },
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
                accessorKey: "shipFrom",
                header: () => "Ship From",
                cell: ({ row }) => <div>
                    <p className="text-[#6E8091] text-xs">
                        {row.original.shipFrom.Name} <br />
                        {row.original.shipFrom.AddressLine1} <br />
                        {row.original.shipFrom.City}, {row.original.shipFrom.StateOrProvinceCode} {row.original.shipFrom.PostalCode} {row.original.shipFrom.CountryCode}<br />
                        07366606715
                    </p>
                </div>,
            },
            {
                accessorKey: "shipTo",
                header: () => "Ship To",
                cell: ({ row }) => <div>
                    <p>{row.getValue("shipTo")}</p>
                    <p className="text-xs text-[#6E8091]">39 Swanscombe Street <br />
                        Swanscombe, Kent DA10 0BQGB<br />
                        07366606715</p>
                </div>,
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
                header: "COG",
                cell: ({ row }) => <div className="text-right">£{row.original.cog[0]}</div>,
            }
        ];
    

    const table = useReactTable({
        data: shipmentItems,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (<Fragment>
        {/* Handle errors */}
        {isError && (
            <div className="p-4 rounded-md text-sm font-medium flex items-center space-x-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
                <span>❌</span>
                <span>
                    Error fetching orders:{" "}
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
                    table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="p-3">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
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
    </Fragment>
    )
}

export default InvetoryDetailsReplenishmentsPage;