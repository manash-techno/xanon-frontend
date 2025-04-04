import { ReactButton } from '@/components/ui/ReactButton';
import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { ReactInput } from "@/components/ui/ReactInput.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table.tsx";
import { AssetsConfig } from '@/config/assetsConfig';
import {
  ColumnDef, flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ChangeEvent, JSX, useState } from "react";

import { ReactDatePicker } from "@/components/ui/ReactDatePicker";
import { CountryFilter } from '../InventoryPage/CountryFilter';
import { StatusFilter } from '../InventoryPage/StatusFilter';

const data: Inventory[] = [
  {
    id: "m5gr84i9",
    image: "",
    product: "Product 1",
    sku: "3V-YU78-8UOF",
    asin: "B007OTJ4D4",
    reconcileTime: "20 Aug 2024 - 6:02 AM",
    available: {
      status: "Reimburse",
      amount: 1,
    },
    amount: 316,
  },
  {
    id: "wilson",
    image: "",
    product: "Product 1",
    sku: "3V-YU78-8UOF",
    asin: "B007OTJ4D4",
    reconcileTime: "20 Aug 2024 - 6:02 AM",
    available: {
      status: "Reimburse",
      amount: 1,
    },
    amount: 316,
  },
];

export type Inventory = {
  id: string;
  image: string;
  product: string;
  sku: string;
  asin: string;
  reconcileTime: string;
  available: {
    status: string;
    amount: number;
  };
  amount: number;
};

const Inventory: () => JSX.Element = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [showReconDetailModal, setShowReconDetailModal] = useState(false)
  const [showRaiseCaseModal, setShowRaiseCaseModal] = useState(false)

  // to be replaced with dispatch
  const [search, setSearch] = useState<string>("");


  const columns = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => <ReactImage src={row.getValue("image")} width={48} height={48} alt="product" className="rounded-sm" fallbackSrc={AssetsConfig.icons.defaultProductImage.src} />,
      size: 50
    },
    {
      accessorKey: "product",
      header: ({ column }) => {
        return (
          <ReactButton
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex flex-col items-start p-0"
          >
            <span className="block">Product</span>
            <span className="block !text-[#6E8091] text-xs">SKU - ASIN</span>
            {/* <CaretSortIcon className="ml-2 h-4 w-4" /> */}
          </ReactButton>
        )
      },
      accessorFn: row => <div>{row.product}
        <span className="text-xs text-[#6E8091] block">{row.sku}</span>
        <span className="text-xs text-[#6E8091] block">{row.asin}</span>
      </div>,
      cell: ({ row }) => <div>{row.getValue("product")}</div>,
    },
    {
      accessorKey: "reconcileTime",
      header: "Reconcile Time",
      cell: ({ row }) => <div>{row.getValue("reconcileTime")}</div>,
    },
    {
      accessorKey: "amountAvailable",
      header: () => <div>Available</div>,
      cell: () => {
        return <div>
          <div className="flex justify-between">
            <span>Reimburse</span>
            <span>1</span>
          </div>
        </div>;
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Estimated amount owned</div>,
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <span>£{row.getValue("amount")}</span>
          </div>
        )
      },
      size: 150
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex flex-col">
            <span className="flex items-center text-[#0077E5]">Listing <ReactImage src={AssetsConfig.icons.arrowUpRightOrange.src} width={20} height={20} alt={AssetsConfig.icons.arrowUpRightOrange.alt} /></span>
            <span className="flex items-center text-[#0077E5] cursor-pointer" onClick={() => setShowReconDetailModal(true)}>Detail</span>
            <span className="flex items-center text-[#0077E5]" onClick={() => setShowRaiseCaseModal(true)}>Raise Case</span>
          </div>
        );
      },
      size: 80
    },
  ] as ColumnDef<Inventory>[];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });


  const handleDateRangeChange = (value: {
    from: string | null;
    to: string | null;
    label: string | null;
  }) => {
    // dispatch(
    //     setDateRange({
    //         startDate: value.from,
    //         endDate: value.to,
    //         label: value.label,
    //     })
    // );
  };

  const handleSearchEvent = (e: ChangeEvent<HTMLInputElement>) => {
    // dispatch(setCurrentPage(1));
    // dispatch(setSearch(e.target.value));
  };

  return (
    <div className="w-full">
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
          placeholder="Search inventory"
          value={search}
          onChange={handleSearchEvent}
          className="w-full h-10 pl-10 text-sm"
        />
      </div>

      <div className="flex items-center mb-6 space-x-5">
        {/* Filter by Date */}
        <ReactDatePicker
          onDateRangeChange={handleDateRangeChange}
        // from={startDate}
        // to={endDate}
        // label={dateRangeLabel}
        />

        {/* Filter by Status */}
        <StatusFilter />

        {/* Filter by Country */}
        <CountryFilter />

        {/* Filter by Fulfillment */}
        {/* <FulfillmentFilter /> */}
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
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
            {
              table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>{row.getVisibleCells().map((cell) => <TableCell
                          key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>
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

      {/* Pagination */}
      {/* <div className="flex justify-end mt-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-[#858585] flex gap-2">
            <span>{pageIndex + 1}</span>
            <span>of</span>
            <span>{table.getPageCount()}</span>
          </div>
          <div className="flex items-center gap-1">
            <ReactButton
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border-none shadow-none p-0"
            >
              <ReactImage
                src={"/chevron-left.svg"}
                width={24}
                height={24}
                alt="right"
              />
            </ReactButton>
            <div className="text-sm">
              {pageIndex + 1}
            </div>
            <ReactButton
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border-none shadow-none p-0"
            >
              <ReactImage
                src={"/chevron-right.svg"}
                width={24}
                height={24}
                alt="right"
              />
            </ReactButton>
          </div>
        </div>
      </div> */}
      {/* <ReconDetailModal showReconDetailModal={showReconDetailModal} setShowReconDetailModal={setShowReconDetailModal} setShowRaiseCaseModal={setShowRaiseCaseModal} /> */}
      {/* <RaiseCaseModal showRaiseCaseModal={showRaiseCaseModal} setShowRaiseCaseModal={setShowRaiseCaseModal} /> */}
    </div>
  );
}

export default Inventory