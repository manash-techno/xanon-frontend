import CaretSortIcon from '@/components/ui/CaretSortIcon';
import { ReactButton } from '@/components/ui/ReactButton';
import { ReactImage } from '@/components/ui/ReactImage';
import { AssetsConfig } from '@/config/assetsConfig';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Fragment, JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table.tsx";
import { BarLoader } from '@/components/common/BarLoader';
import { NotepadModal } from '@/components/modals/NotepadModal';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface InvetoryDetailsOrdersPageProps {
  orders: Array<any>; // Replace with your actual order type
  isFetching: boolean; // Add this prop to indicate loading state
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined
}

const InvetoryDetailsOrdersPage: React.FC<InvetoryDetailsOrdersPageProps> = ({ orders, isFetching, isError, error }) => {
  const [showMoreActions, setShowMoreActions] = useState<{
    [key: string]: boolean;
  }>({});
  const [showNotepadModal, setShowNotepadModal] = useState(false);

  // Toggle More/Less actions
  const toggleMoreActions = (id: string) => {
    setShowMoreActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const columns: ColumnDef<(typeof orders)[0]>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div>
          {row.original.date}{" "}
          <span className="block text-xs text-[#6E8091]">
            {row.original.time}
          </span>
        </div>
      ),
      size: 80,
    },
    {
      accessorKey: "orderId",
      header: "Amazon Order ID",
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.getValue("orderId")}
          <ReactImage
            src={AssetsConfig.icons.rightUp.src}
            width={20}
            height={20}
            alt={AssetsConfig.icons.rightUp.alt}
            className="h-auto w-auto"
          />
        </div>
      ),
      size: 200,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2.5">
            <ReactImage
              src={
                row.original.images[0] ||
                AssetsConfig.icons.defaultProductImage.src
              }
              width={48}
              height={48}
              alt={AssetsConfig.icons.defaultProductImage.alt}
              className="rounded-sm w-12 h-12 object-contain"
              fallbackSrc={AssetsConfig.icons.defaultProductImage.src}
            />
            {row.original.images.length > 1 && (
              <span className="text-sm text-[#0077E5] font-medium">
                +{row.original.images.length - 1}
              </span>
            )}
          </div>
        );
      },
      size: 80,
    },
    {
      accessorKey: "products",
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
        );
      },
      cell: ({ row }) => {
        return (
          <div>
            <div className="line-clamp-2">{row.original.products[0]}</div>
            <div className="line-clamp-2">
              <span className="text-xs text-[#6E8091] block">
                {row.original.skus[0]}
              </span>
              <span className="text-xs text-[#6E8091] block">
                {row.original.asins[0]}
              </span>
            </div>
          </div>
        );
      },
      size: 250,
    },
    {
      accessorKey: "conditions",
      header: () => {
        return (
          <div>
            <span className="block">Conditions</span>
          </div>
        );
      },
      cell: ({ row }) => {
        return <div>{row.original.conditions[0]}</div>;
      },
      size: 105,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Fragment>
          <div>
            {row.getValue("status")}
            <span className="text-xs text-[#6E8091] block">
              {row.original.salesChannel}
            </span>
          </div>
        </Fragment>
      ),
    },
    {
      accessorKey: "quantity",
      header: () => {
        return (
          <div>
            <span className="block">Quantity</span>
            <span className="block !text-[#6E8091] text-xs">Order Type</span>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <>
            <div>{row.original.quantities[0]}</div>
            {row.original.orderType && (
              <div className="text-xs text-[#6E8091]">
                {row.original.orderType}
              </div>
            )}
          </>
        );
      },
      size: 105,
    },
    {
      accessorKey: "sales",
      header: () => {
        return <div className="text-right">Sales</div>;
      },
      cell: ({ row }) => {
        const id = row.original.orderId;
        const isMoreActionsVisible = showMoreActions[id];

        return (
          <div className="text-right">
            {isMoreActionsVisible && (
              <Fragment>
                <span>£{row.original.totalAmount}</span>
                <div className="flex justify-between text-xs text-[#6E8091]">
                  <span>Profit</span>
                  <span>£{row.original.profits[0]}</span>
                </div>
              </Fragment>
            )}
            <div className="flex justify-between text-xs text-[#6E8091]">
              <span>ROI</span>
              <span>{row.original.roiPercentages[0]}%</span>
            </div>
            {isMoreActionsVisible && (
              <Fragment>
                <div className="flex justify-between text-xs text-[#6E8091]">
                  <span>Margin</span>
                  <span>{row.original.margins[0]}%</span>
                </div>
              </Fragment>
            )}
            <div className="flex justify-between text-xs text-[#6E8091]">
              <span>VAT</span>
              <span>£{row.original.vatAmounts[0]}</span>
            </div>
            {isMoreActionsVisible && (
              <Fragment>
                <div className="flex justify-between text-xs text-[#6E8091]">
                  <span>Fees</span>
                  <span>£{row.original.fees[0]}</span>
                </div>
              </Fragment>
            )}
          </div>
        );
      },
      size: 160,
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
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
                  onClick={() => setShowNotepadModal(true)}
                  className="flex items-center text-[#0077E5] cursor-pointer"
                >
                  Notepad
                </span>
                <Link to={`/inventory/detail/${row.original.skus[0]}`}>
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
              <ReactImage
                src={
                  isMoreActionsVisible
                    ? AssetsConfig.icons.chevronUp.src
                    : AssetsConfig.icons.chevronDown.src
                }
                width={20}
                height={20}
                alt="toggle"
              />
            </span>
          </div>
        );
      },
      size: 100,
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Fragment>
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
      <NotepadModal
        showNotepadModal={showNotepadModal}
        setShowNotepadModal={setShowNotepadModal}
      />
    </Fragment>
  )
}

export default InvetoryDetailsOrdersPage;