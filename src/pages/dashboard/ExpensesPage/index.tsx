import { BarLoader } from "@/components/common/BarLoader.tsx";
import { PaginationControls } from "@/components/common/PaginationControls.tsx";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { ReactInput } from "@/components/ui/ReactInput.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table.tsx";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import { formatShortDate } from "@/lib/utils";
import { setCurrentPage, setSearch } from "@/store/slices/shipmentSlice.ts";
import { RootState } from "@/store/store.ts";
import {
    ColumnDef, flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    useReactTable
} from "@tanstack/react-table";
import { ChangeEvent, JSX, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactDatePicker } from "@/components/ui/ReactDatePicker";
import { useGetExpensesQuery } from "@/store/api/expensesApi";
import { setDateRange } from "@/store/slices/shipmentSlice";
import { Link } from "react-router-dom";
import { CategoryFilter } from "./CategoryFilter";
import { FulfillmentFilter } from "./FulfillmentFilter";
import { Checkbox } from "@mui/material";
import { DeleteExpenseModal } from "@/components/modals/DeleteExpenseModal";

const ExpensesPage: () => JSX.Element = () => {
    const dispatch = useDispatch();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [selectedId, setSelectedId] = useState("");
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({}) //manage your own row selection state
    let rowSize = Object.keys(rowSelection).length;
    const [showDeleteExpenseModal, setShowDeleteExpenseModal] = useState(false);

    const {
        search,
        selectedCategory,
        currentPage,
        startDate,
        endDate,
        dateRangeLabel
    } = useSelector((state: RootState) => state.expenses);

    const {
        data: expensesData,
        isFetching,
        isSuccess,
        isError,
        refetch: expensesRefetch
    } = useGetExpensesQuery({
        page: currentPage,
        category: selectedCategory,
        search,
        purchase_date_before: endDate,
        purchase_date_after: startDate,
    });

    const Expenses = useMemo(() => {
        if (!isSuccess || !expensesData?.results) return [];

        return expensesData.results.map((item) => ({
            id: item.id,
            date: item.date,
            category: item.category,
            description: item.description,
            amount: item.amount,
            recur: item.recur,
            vat: item.vat,

        }));
    }, [expensesData, isSuccess]);

    const columns: ColumnDef<typeof Expenses[0]>[] = [
        {
            accessorKey: "selection-col",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
                />
            ),
            cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
        },
        {
            accessorKey: "date",
            header: () => rowSize > 0 ? <div>{rowSize} Selected </div> : "Date",
            cell: ({ row }) => <div>{formatShortDate(new Date(row.getValue("date")))}</div>,
        },
        {
            accessorKey: "category",
            header: () => rowSize > 0 ?
                <div
                    className="flex items-center text-[#E50000] cursor-pointer"
                    onClick={() => { setShowDeleteExpenseModal(true) }}>
                    Delete
                </div>
                : (
                    <div
                    >
                        <span className="block">Category</span>
                        <span className="block !text-[#6E8091] text-xs">Recurs</span>
                    </div>
                ),
            accessorFn: row => <div>{row.category}
                <span className="text-xs text-[#6E8091] block">{row.recur}</span>
            </div>,
            cell: ({ row }) => <div>{row.getValue("category")}</div>,
        },
        {
            accessorKey: "description",
            header: () => rowSize > 0 ? "" : "Description",
            cell: ({ row }) => <div>{row.getValue("description")}</div>,
        },
        {
            accessorKey: "amount",
            header: () => rowSize > 0 ? "" : <div className="text-right">Total Amount</div>,
            accessorFn: row =>
                <div className="text-right">-£{row.amount}
                    <div className="flex justify-between">
                        <span className="text-xs text-[#6E8091] block">VAT Amont</span>
                        <span className="text-xs text-[#6E8091] block">{row.vat}</span>
                    </div>
                </div>,
            cell: ({ row }) => <div>{row.getValue("amount")}</div>
        },
        {
            id: "actions",
            header: () => rowSize > 0 ? "" : "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-col">
                        <Link to={`/expenses/edit/${row.original.id}`}><span className="flex items-center text-xs text-[#0077E5]">Edit</span></Link>
                        <span className="flex items-center text-xs text-[#E50000] cursor-pointer" onClick={() => { setShowDeleteExpenseModal(true); setSelectedId(row.original.id) }}>Delete</span>
                    </div>
                );
            },
        },
    ];

    const table = useReactTable({
        getRowId: row => row.id,
        data: Expenses,
        columns,
        onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
        state: {
            rowSelection, //pass the row selection state back to the table instance
        },
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

            <div className="flex justify-between">
                <div className="relative mb-4 w-60">
                    <div className="absolute -translate-y-2/4 top-2/4 left-3">
                        <ReactImage src={AssetsConfig.icons.search.src} alt={AssetsConfig.icons.search.alt} width={16} height={16} />
                    </div>
                    <ReactInput placeholder="Search expenses" value={search} onChange={handleSearchEvent} className="w-full h-10 pl-10 text-sm" />
                </div>

                <Link type="button" to="add" className="flex items-center mb-6 space-x-2 border py-2 px-6 text-sm rounded-md text-[#0077E5]  border-[#0077E5]">
                    Add Expense
                </Link>
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
                <CategoryFilter />

                {/* Filter by Fulfillment */}
                <FulfillmentFilter />
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md">
                {isError && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-md flex items-center">
                        <span>
                            Error fetching Expenses
                        </span>
                        <ReactButton
                            variant="outline"
                            className="ml-4 text-red-700 border-red-400 hover:bg-red-200"
                            onClick={() => expensesRefetch()}
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
                                    <TableHead key={header.id} className="p-3 nth-[1]:p-2">
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

            <PaginationControls currentPage={currentPage} onPageChange={(page) => dispatch(setCurrentPage(page))} totalPages={expensesData?.count ? Math.ceil(expensesData.count / 10) : 1} />
            <DeleteExpenseModal
                showDeleteExpenseModal={showDeleteExpenseModal}
                setShowDeleteExpenseModal={setShowDeleteExpenseModal}
            />
        </div>
    );
};

export default ExpensesPage;
