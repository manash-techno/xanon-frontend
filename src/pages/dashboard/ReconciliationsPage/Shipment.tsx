import CaretSortIcon from '@/components/ui/CaretSortIcon';
import { ReactButton } from '@/components/ui/ReactButton';
import { ReactDatePicker } from '@/components/ui/ReactDatePicker';
import { ReactImage } from '@/components/ui/ReactImage';
import { ReactInput } from '@/components/ui/ReactInput';
import { AssetsConfig } from '@/config/assetsConfig';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import {ChangeEvent, JSX, useState} from 'react'
import { StatusFilter } from '../ShipmentsPage/StatusFilter';
import { CountryFilter } from '../ShipmentsPage/CountryFilter';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table.tsx";
import { BarLoader } from '@/components/common/BarLoader';


const data: Shipment[] = [
  {
      id: "m5gr84i9",
      date: "Jul 25, 24",
      time: "11:22 AM",
      shipmentId: "M5N1234567",
      destination: "LBA4",
      statusDestination: "Closed",
      receivedDate: "30 Jul 24",
      receivedTime: "12:00 AM",
      shippedCount: 84,
      receivedCount: 84,
      reconciledCount: 0,
      skuCount: 1,
      skuIssue: 0,
      image: "",
      product: "Product 1",
      sku: "3V-YU78-8UOF",
      asin: "B007OTJ4D4"
  },
  {
      id: "m5gr87i9",
      date: "Jul 25, 24",
      time: "11:22 AM",
      shipmentId: "M5N1234567",
      destination: "LBA4",
      statusDestination: "Closed",
      receivedDate: "30 Jul 24",
      receivedTime: "12:00 AM",
      shippedCount: 84,
      receivedCount: 84,
      reconciledCount: 0,
      skuCount: 1,
      skuIssue: 0,
      image: "",
      product: "Product 1",
      sku: "3V-YU78-8UOF",
      asin: "B007OTJ4D4"
  },
  {
      id: "m5gr84u9",
      date: "Jul 25, 24",
      time: "11:22 AM",
      shipmentId: "M5N1234567",
      destination: "LBA4",
      statusDestination: "Closed",
      receivedDate: "30 Jul 24",
      receivedTime: "12:00 AM",
      shippedCount: 84,
      receivedCount: 84,
      reconciledCount: 0,
      skuCount: 1,
      skuIssue: 0,
      image: "",
      product: "Product 1",
      sku: "3V-YU78-8UOF",
      asin: "B007OTJ4D4"
  }
];

export type Shipment = {
  id: string;
  date: string;
  time: string;
  shipmentId: string;
  destination: string;
  statusDestination: string;
  receivedDate: string;
  receivedTime: string;
  shippedCount: number;
  receivedCount: number;
  reconciledCount: number;
  skuCount: number;
  skuIssue: number;
  image: string;
  product: string;
  sku: string;
  asin: string;
};

const Shipment:() => JSX.Element = () => {
  const [showMoreActions, setShowMoreActions] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState<string>("");

  const toggleMoreActions = (id: string) => {
    setShowMoreActions((prev) => ({ ...prev, [id]: !prev[id] }));
};

const columns: ColumnDef<Shipment>[] = [
  {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div>{row.original.date} <span className="block text-xs text-[#6E8091]">{row.original.time}</span></div>,
  },
  {
      accessorKey: "shipmentId",
      header: ({ column }) => {
          return (
              <ReactButton
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                  className="flex flex-col items-start p-0"
              >
                  <span className="block">Shipment ID</span>
                  <span className="block !text-[#6E8091] text-xs">Destination</span>
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </ReactButton>
          )
      },
      cell: ({ row }) => {
          return (
              <>
                  <div className="flex">{row.getValue("shipmentId")}<ReactImage src="/arrow-up-right-grey.svg" width={20} height={20} alt="arrow" className="cursor-pointer" /></div>
                  <p className="text-[#6E8091] text-xs">{row.original.destination}</p>
              </>
          )
      },
  },
  {
      accessorKey: "statusDestination",
      header: () => <div><span className="block">Status Destination</span>
          <span className="block !text-[#6E8091] text-xs">Received</span></div>
      ,
      cell: ({ row }) => <>
          <div className="flex">{row.getValue("statusDestination")}</div>
          <span className="text-[#6E8091] text-xs">{row.original.receivedDate} - {row.original.receivedTime}</span>
      </>,
  },
  {
      accessorKey: "shippedCount",
      header: "Shipment",
      cell: ({ row }) => {
          const id = row.original.id; // Get the row's unique ID
          const isMoreActionsVisible = showMoreActions[id] || false; // Default to false if undefined   

          return (
              <>
                  <div>
                      <div className="flex justify-between text-[#6E8091] text-xs">
                          <span>Shipped</span>
                          <span>{row.getValue("shippedCount")}</span>
                      </div>
                      <div className="flex justify-between text-[#6E8091] text-xs">
                          <span>Received</span>
                          <span>{row.original.receivedCount}</span>
                      </div>
                      <div className="flex justify-between text-[#6E8091] text-xs">
                          <span>Reconciled</span>
                          <span>{row.original.reconciledCount}</span>
                      </div>
                  </div>
              </>
          )
      }
  },
  {
      accessorKey: "skuCount",
      header: "Availability",
      cell: ({ row }) => <div>
          <div className="flex justify-between text-[#6E8091] text-xs">
              <span>SKU Count</span>
              <span>{row.getValue("skuCount")}</span>
          </div>
          <div className="flex justify-between text-[#6E8091] text-xs">
              <span>SKU Issue</span>
              <span>{row.original.skuIssue}</span>
          </div>
      </div>
  },
  {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
          const id = row.original.id;
          const isMoreActionsVisible = showMoreActions[id];

          return (
              <span
                  className="flex items-center cursor-pointer"
                  onClick={() => toggleMoreActions(id)}
              >
                  {isMoreActionsVisible ? "Less" : "More"} <ReactImage src={isMoreActionsVisible ? AssetsConfig.icons.chevronUp.src : AssetsConfig.icons.chevronDown.src} width={20} height={20} alt="arrow" />
              </span>
          );
      },
      size: 80
  },
];

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
          placeholder="Search shipment"
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
              false
                ? (
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

export default Shipment