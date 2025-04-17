import { ChangeEvent, Fragment, JSX, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table.tsx";
import { ReactInput } from "@/components/ui/ReactInput.tsx";
import { BarLoader } from "@/components/common/BarLoader.tsx";
import { RootState } from "@/store/store.ts";
import { useGetOrdersQuery } from "@/store/api/orderApi.ts";
import {
  setCurrentPage,
  setDateRange,
  setSearch,
} from "@/store/slices/orderSlice.ts";
import { formatShortDate, formatTime } from "@/lib/utils.ts";
import { PaginationControls } from "@/components/common/PaginationControls.tsx";
import { ReactImage } from "@/components/ui/ReactImage.tsx";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import { ReactButton } from "@/components/ui/ReactButton.tsx";
import CaretSortIcon from "@/components/ui/CaretSortIcon.tsx";
import { Link } from "react-router-dom";
import { ReactDatePicker } from "@/components/ui/ReactDatePicker";
import { FulfillmentFilter } from "@/pages/dashboard/OrdersPage/FulfillmentFilter.tsx";
import { StatusFilter } from "@/pages/dashboard/OrdersPage/StatusFilter.tsx";
import { CountryFilter } from "@/pages/dashboard/OrdersPage/CountryFilter.tsx";
import { NotepadModal } from "@/components/modals/NotepadModal";
import { pagePaths } from "@/config/pagePaths";
import { Box, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CloseIcon from "@mui/icons-material/Close";

const OrdersPage: () => JSX.Element = () => {
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
  } = useSelector((state: RootState) => state.order);

  const {
    data: orderData,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery({
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
  const [showNotepadModal, setShowNotepadModal] = useState(false);

  // Toggle More/Less actions
  const toggleMoreActions = (id: string) => {
    setShowMoreActions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const orders = useMemo(
    () =>
      isSuccess
        ? orderData?.results?.map((order) => ({
            images: order.order_items?.map((item) => item.image_url) || [],
            products: order.order_items?.map((item) => item.title) || [],
            skus: order.order_items?.map((item) => item.seller_sku) || [],
            asins: order.order_items?.map((item) => item.asin) || [],
            conditions: order.order_items?.map((item) => item.condition) || [],
            quantities:
              order.order_items?.map((item) => item.quantity_ordered) || [],
            itemPrices: order.order_items?.map((item) => item.item_price) || [],
            vatAmounts: order.order_items?.map((item) => item.vat) || [],
            roiPercentages: order.order_items?.map((item) => item.roi) || [],
            costOfGoods:
              order.order_items?.map((item) => item.cost_of_goods) || [],
            fees: order.order_items?.map((item) => item.fees) || [],
            profits: order.order_items?.map((item) => item.profit) || [],
            margins: order.order_items?.map((item) => item.margin) || [],
            orderType: order.order_type, // Fixed: `order.order_items.order_type` to `order.order_type`
            date: formatShortDate(new Date(order.purchase_date)),
            time: formatTime(new Date(), { hour12: true, showSeconds: false }),
            orderId: order.amazon_order_id,
            status: order.order_status,
            totalAmount: order.order_total_amount,
            totalCurrency: order.order_total_currency_code || "-",
            salesChannel: order.sales_channel,
            fulfillmentChannel: order.fulfillment_channel,
          })) || []
        : [],
    [orderData, isSuccess]
  );

  const columns: ColumnDef<(typeof orders)[0]>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="w-[100px]">
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
            <span className="block !text-[#6E8091] text-xs">Category</span>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <Fragment>
            <div>{row.original.conditions[0]}</div>
            <span className="block !text-[#6E8091] text-xs">Beauty</span>
          </Fragment>
        );
      },
      size: 105,
    },
    {
      accessorKey: "status",
      header: () => {
        return (
          <div>
            <span className="block">Status</span>
            <span className="block !text-[#6E8091] text-xs">Amazon.co.uk</span>
          </div>
        );
      },
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
    // {
    //   accessorKey: "sales",
    //   header: () => {
    //     return <div className="text-right">Sales</div>;
    //   },
    //   cell: ({ row }) => {
    //     const id = row.original.orderId;
    //     const isMoreActionsVisible = showMoreActions[id];

    //     return (
    //       <div className="text-right">
    //         {isMoreActionsVisible && (
    //           <Fragment>
    //             <span>£{row.original.totalAmount}</span>
    //             <div className="flex justify-between text-xs text-[#6E8091]">
    //               <span>Profit</span>
    //               <span>£{row.original.profits[0]}</span>
    //             </div>
    //           </Fragment>
    //         )}
    //         <div className="flex justify-between text-xs text-[#6E8091]">
    //           <span>ROI</span>
    //           <span>{row.original.roiPercentages[0]}%</span>
    //         </div>
    //         {isMoreActionsVisible && (
    //           <Fragment>
    //             <div className="flex justify-between text-xs text-[#6E8091]">
    //               <span>Margin</span>
    //               <span>{row.original.margins[0]}%</span>
    //             </div>
    //           </Fragment>
    //         )}
    //         <div className="flex justify-between text-xs text-[#6E8091]">
    //           <span>VAT</span>
    //           <span>£{row.original.vatAmounts[0]}</span>
    //         </div>
    //         {isMoreActionsVisible && (
    //           <Fragment>
    //             <div className="flex justify-between text-xs text-[#6E8091]">
    //               <span>Fees</span>
    //               <span>£{row.original.fees[0]}</span>
    //             </div>
    //           </Fragment>
    //         )}
    //       </div>
    //     );
    //   },
    //   size: 160,
    // },
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
                <Link
                  to={`${pagePaths.dashboard.inventoryDetails}/${row.original.skus[0]}`}
                  replace
                >
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
                src={
                  isMoreActionsVisible
                    ? AssetsConfig.icons.chevronUp.src
                    : AssetsConfig.icons.chevronDown.src
                }
                alt={
                  isMoreActionsVisible
                    ? AssetsConfig.icons.chevronUp.alt
                    : AssetsConfig.icons.chevronDown.alt
                }
                width={16}
                height={16}
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
      {/* <div className="flex items-center gap-2 mb-5 md:mb-6">
        <h1 className="text-[#1E1E1E] dark:text-[#F2F2F2] font-bold text-xl">
          Orders
        </h1>
      </div> */}

      <div className="flex flex-wrap items-center mb-6 -m-[4px] md:-m-[8px]">
        {/* Filter by Date */}
        <div className="w-full p-[4px] md:p-[8px]">
          <div className="relative w-60">
            <div className="absolute -translate-y-2/4 top-2/4 left-3">
              <ReactImage
                src={AssetsConfig.icons.search.src}
                width={16}
                height={16}
                alt={AssetsConfig.icons.search.alt}
              />
            </div>
            <ReactInput
              placeholder="Search order"
              value={search}
              onChange={handleSearchEvent}
              className="w-full h-10 pl-10 text-sm"
            />
          </div>
        </div>
        <div className="w-[50%] md:w-[auto] p-[4px] md:p-[8px]">
          <ReactDatePicker
            onDateRangeChange={handleDateRangeChange}
            from={startDate}
            to={endDate}
            label={dateRangeLabel}
          />
        </div>
        {/* Filter by Status */}
        <div className="w-[50%] md:w-[auto] p-[4px] md:p-[8px]">
          <StatusFilter />
        </div>
        {/* Filter by Country */}
        <div className="w-[50%] md:w-[auto] p-[4px] md:p-[8px]">
          <CountryFilter />
        </div>
        {/* Filter by Fulfillment */}
        <div className="w-[auto] p-[4px] md:p-[8px]">
          <FulfillmentFilter />
        </div>
      </div>

      {/* start: responsive table */}
      <Box className="bg-[#FAFAFA] py-[16px] px-[10px] flex flex-col gap-4 md:hidden mb-4">

        {/* start: table item */}
        <Box className="flex flex-col gap-3 border-b border-[#eaeaea] first-child:border-b-0 pb-4">
          <Box className="flex gap-4">
            <Typography className="text-[#1E1E1E] dark:text-[#fff] font-light">
              Jul 25, 24
            </Typography>
            <Typography className="text-[#6E8091] dark:text-[#828282] font-light">
              11:22 AM
            </Typography>
          </Box>
          <Box className="flex gap-1 items-center">
            <Typography className="text-[#1E1E1E] dark:text-[#fff]">
              203-4886959-8683560
            </Typography>
            <ArrowOutwardIcon
              className="text-[#6E8091] dark:text-[#828282]"
              style={{ fontSize: "20px" }}
            />
          </Box>

          <Box className="flex gap-4 items-center">
            <Box className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
              <img src="/assets/images/box-icon.svg" alt="" />
            </Box>
            <Box className="">
              <Typography
                className="text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                Schwarzkopf Silhouette Super Hold Hairspray 300ml
              </Typography>
              <Box className="flex flex-wrap gap-2">
                <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                  3V-YU78-8UOF
                </Typography>
                <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                  B007OTJ4D4
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="">
            <table
              className="w-full w-full border-separate"
              style={{ borderSpacing: "0 0" }}
            >
              <thead>
                <tr>
                  <th className="border-b border-[#eaeaea] text-left pb-2 w-[100px]">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      New
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Beauty
                    </div>
                  </th>
                  <th className="border-b border-[#eaeaea] text-left pb-2 w-[120px]">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      Pending
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Amazon.uk
                    </div>
                  </th>
                  <th className="text-right border-b border-[#eaeaea] pb-2">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      Quantity: 1
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Customer Order
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pt-2 align-top"></td>
                  <td className="pt-2 align-top">
                    <div className="flex justify-between items-center">
                      <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                        Sale
                      </div>
                      <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px] text-right">
                        £9.40
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                        ROI
                      </div>
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal text-right">
                        45.67%
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                        Profit
                      </div>
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal text-right">
                        £0.44
                      </div>
                    </div>
                  </td>
                  <td className="pt-2 align-top">
                    <div className="flex flex-col items-end">
                      <span className="flex items-center text-[#0077E5] text-[14px]">
                        Invoice{" "}
                        <ReactImage
                          src={AssetsConfig.icons.arrowUpRightOrange.src}
                          width={20}
                          height={20}
                          alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                        />
                      </span>
                      <span className="flex items-center text-[#0077E5] text-[14px]">
                        Listing{" "}
                        <ReactImage
                          src={AssetsConfig.icons.arrowUpRightOrange.src}
                          width={20}
                          height={20}
                          alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                        />
                      </span>
                      <Fragment>
                        <span className="flex items-center text-[#0077E5] cursor-pointer text-[14px]">
                          Notepad
                        </span>
                        <Link to={`#`} replace>
                          <span className="flex items-center text-[#0077E5] text-[14px]">
                            Inventory
                          </span>
                        </Link>
                      </Fragment>
                      <span className="flex items-center cursor-pointer text-[14px]">
                        Less
                        <ReactImage
                          src={AssetsConfig.icons.chevronUp.src}
                          width={16}
                          height={16}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
        {/* start: table item */}
        {/* start: table item */}
        <Box className="flex flex-col gap-3 border-b border-[#eaeaea] first-child:border-b-0 pb-4">
          <Box className="flex gap-4">
            <Typography className="text-[#1E1E1E] dark:text-[#fff] font-light">
              Jul 25, 24
            </Typography>
            <Typography className="text-[#6E8091] dark:text-[#828282] font-light">
              11:22 AM
            </Typography>
          </Box>
          <Box className="flex gap-1 items-center">
            <Typography className="text-[#1E1E1E] dark:text-[#fff]">
              203-4886959-8683560
            </Typography>
            <ArrowOutwardIcon
              className="text-[#6E8091] dark:text-[#828282]"
              style={{ fontSize: "20px" }}
            />
          </Box>

          <Box className="flex gap-4 items-center">
            <Box className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
              <img src="/assets/images/box-icon.svg" alt="" />
            </Box>
            <Box className="">
              <Typography
                className="text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                Schwarzkopf Silhouette Super Hold Hairspray 300ml
              </Typography>
              <Box className="flex flex-wrap gap-2">
                <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                  3V-YU78-8UOF
                </Typography>
                <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                  B007OTJ4D4
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="">
            <table
              className="w-full w-full border-separate"
              style={{ borderSpacing: "0 0" }}
            >
              <thead>
                <tr>
                  <th className="border-b border-[#eaeaea] text-left pb-2 w-[100px]">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      New
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Beauty
                    </div>
                  </th>
                  <th className="border-b border-[#eaeaea] text-left pb-2 w-[120px]">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      Pending
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Amazon.uk
                    </div>
                  </th>
                  <th className="text-right border-b border-[#eaeaea] pb-2">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      Quantity: 1
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Customer Order
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pt-2 align-top"></td>
                  <td className="pt-2 align-top">
                    <div className="flex justify-between items-center">
                      <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                        Sale
                      </div>
                      <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px] text-right">
                        £9.40
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                        ROI
                      </div>
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal text-right">
                        45.67%
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                        Profit
                      </div>
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal text-right">
                        £0.44
                      </div>
                    </div>
                  </td>
                  <td className="pt-2 align-top">
                    <div className="flex flex-col items-end">
                      <span className="flex items-center text-[#0077E5] text-[14px]">
                        Invoice{" "}
                        <ReactImage
                          src={AssetsConfig.icons.arrowUpRightOrange.src}
                          width={20}
                          height={20}
                          alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                        />
                      </span>
                      <span className="flex items-center text-[#0077E5] text-[14px]">
                        Listing{" "}
                        <ReactImage
                          src={AssetsConfig.icons.arrowUpRightOrange.src}
                          width={20}
                          height={20}
                          alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                        />
                      </span>
                      <Fragment>
                        <span className="flex items-center text-[#0077E5] cursor-pointer text-[14px]">
                          Notepad
                        </span>
                        <Link to={`#`} replace>
                          <span className="flex items-center text-[#0077E5] text-[14px]">
                            Inventory
                          </span>
                        </Link>
                      </Fragment>
                      <span className="flex items-center cursor-pointer text-[14px]">
                        Less
                        <ReactImage
                          src={AssetsConfig.icons.chevronUp.src}
                          width={16}
                          height={16}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
        {/* start: table item */}
        {/* start: table item */}
        <Box className="flex flex-col gap-3 border-b border-[#eaeaea] first-child:border-b-0 pb-4">
          <Box className="flex gap-4">
            <Typography className="text-[#1E1E1E] dark:text-[#fff] font-light">
              Jul 25, 24
            </Typography>
            <Typography className="text-[#6E8091] dark:text-[#828282] font-light">
              11:22 AM
            </Typography>
          </Box>
          <Box className="flex gap-1 items-center">
            <Typography className="text-[#1E1E1E] dark:text-[#fff]">
              203-4886959-8683560
            </Typography>
            <ArrowOutwardIcon
              className="text-[#6E8091] dark:text-[#828282]"
              style={{ fontSize: "20px" }}
            />
          </Box>

          <Box className="flex gap-4 items-center">
            <Box className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
              <img src="/assets/images/box-icon.svg" alt="" />
            </Box>
            <Box className="">
              <Typography
                className="text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                Schwarzkopf Silhouette Super Hold Hairspray 300ml
              </Typography>
              <Box className="flex flex-wrap gap-2">
                <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                  3V-YU78-8UOF
                </Typography>
                <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                  B007OTJ4D4
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="">
            <table
              className="w-full w-full border-separate"
              style={{ borderSpacing: "0 0" }}
            >
              <thead>
                <tr>
                  <th className="border-b border-[#eaeaea] text-left pb-2 w-[100px]">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      New
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Beauty
                    </div>
                  </th>
                  <th className="border-b border-[#eaeaea] text-left pb-2 w-[120px]">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      Pending
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Amazon.uk
                    </div>
                  </th>
                  <th className="text-right border-b border-[#eaeaea] pb-2">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      Quantity: 1
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Customer Order
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pt-2 align-top"></td>
                  <td className="pt-2 align-top">
                    <div className="flex justify-between items-center">
                      <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                        Sale
                      </div>
                      <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px] text-right">
                        £9.40
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                        ROI
                      </div>
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal text-right">
                        45.67%
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                        Profit
                      </div>
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal text-right">
                        £0.44
                      </div>
                    </div>
                  </td>
                  <td className="pt-2 align-top">
                    <div className="flex flex-col items-end">
                      <span className="flex items-center text-[#0077E5] text-[14px]">
                        Invoice{" "}
                        <ReactImage
                          src={AssetsConfig.icons.arrowUpRightOrange.src}
                          width={20}
                          height={20}
                          alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                        />
                      </span>
                      <span className="flex items-center text-[#0077E5] text-[14px]">
                        Listing{" "}
                        <ReactImage
                          src={AssetsConfig.icons.arrowUpRightOrange.src}
                          width={20}
                          height={20}
                          alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                        />
                      </span>
                      <Fragment>
                        <span className="flex items-center text-[#0077E5] cursor-pointer text-[14px]">
                          Notepad
                        </span>
                        <Link to={`#`} replace>
                          <span className="flex items-center text-[#0077E5] text-[14px]">
                            Inventory
                          </span>
                        </Link>
                      </Fragment>
                      <span className="flex items-center cursor-pointer text-[14px]">
                        Less
                        <ReactImage
                          src={AssetsConfig.icons.chevronUp.src}
                          width={16}
                          height={16}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
        {/* start: table item */}
        {/* start: table item */}
        <Box className="flex flex-col gap-3 border-b border-[#eaeaea] first-child:border-b-0 pb-4">
          <Box className="flex gap-4">
            <Typography className="text-[#1E1E1E] dark:text-[#fff] font-light">
              Jul 25, 24
            </Typography>
            <Typography className="text-[#6E8091] dark:text-[#828282] font-light">
              11:22 AM
            </Typography>
          </Box>
          <Box className="flex gap-1 items-center">
            <Typography className="text-[#1E1E1E] dark:text-[#fff]">
              203-4886959-8683560
            </Typography>
            <ArrowOutwardIcon
              className="text-[#6E8091] dark:text-[#828282]"
              style={{ fontSize: "20px" }}
            />
          </Box>

          <Box className="flex gap-4 items-center">
            <Box className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
              <img src="/assets/images/box-icon.svg" alt="" />
            </Box>
            <Box className="">
              <Typography
                className="text-[#1E1E1E] dark:text-[#fff] break-words whitespace-normal overflow-hidden text-ellipsis"
                style={{
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                  display: "-webkit-box",
                  WebkitLineClamp: "1",
                  WebkitBoxOrient: "vertical",
                }}
              >
                Schwarzkopf Silhouette Super Hold Hairspray 300ml
              </Typography>
              <Box className="flex flex-wrap gap-2">
                <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                  3V-YU78-8UOF
                </Typography>
                <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                  B007OTJ4D4
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="">
            <table
              className="w-full w-full border-separate"
              style={{ borderSpacing: "0 0" }}
            >
              <thead>
                <tr>
                  <th className="border-b border-[#eaeaea] text-left pb-2 w-[100px]">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      New
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Beauty
                    </div>
                  </th>
                  <th className="border-b border-[#eaeaea] text-left pb-2 w-[120px]">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      Pending
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Amazon.uk
                    </div>
                  </th>
                  <th className="text-right border-b border-[#eaeaea] pb-2">
                    <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                      Quantity: 1
                    </div>
                    <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                      Customer Order
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pt-2 align-top"></td>
                  <td className="pt-2 align-top">
                    <div className="flex justify-between items-center">
                      <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px]">
                        Sale
                      </div>
                      <div className="text-[#1E1E1E] dark:text-[#fff] font-normal text-[14px] text-right">
                        £9.40
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                        ROI
                      </div>
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal text-right">
                        45.67%
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal">
                        Profit
                      </div>
                      <div className="text-[#6E8091] text-[12px] text-[#828282] font-normal text-right">
                        £0.44
                      </div>
                    </div>
                  </td>
                  <td className="pt-2 align-top">
                    <div className="flex flex-col items-end">
                      <span className="flex items-center text-[#0077E5] text-[14px]">
                        Invoice{" "}
                        <ReactImage
                          src={AssetsConfig.icons.arrowUpRightOrange.src}
                          width={20}
                          height={20}
                          alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                        />
                      </span>
                      <span className="flex items-center text-[#0077E5] text-[14px]">
                        Listing{" "}
                        <ReactImage
                          src={AssetsConfig.icons.arrowUpRightOrange.src}
                          width={20}
                          height={20}
                          alt={AssetsConfig.icons.arrowUpRightOrange.alt}
                        />
                      </span>
                      <Fragment>
                        <span className="flex items-center text-[#0077E5] cursor-pointer text-[14px]">
                          Notepad
                        </span>
                        <Link to={`#`} replace>
                          <span className="flex items-center text-[#0077E5] text-[14px]">
                            Inventory
                          </span>
                        </Link>
                      </Fragment>
                      <span className="flex items-center cursor-pointer text-[14px]">
                        Less
                        <ReactImage
                          src={AssetsConfig.icons.chevronUp.src}
                          width={16}
                          height={16}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
        {/* start: table item */}

      </Box>
      {/* end: responsive table */}

      <div className="overflow-x-auto rounded-lg shadow-md mt-6">
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

        <Table className="min-w-full hidden md:table">
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
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        totalPages={orderData?.count ? Math.ceil(orderData.count / 10) : 1}
      />
      <NotepadModal
        showNotepadModal={showNotepadModal}
        setShowNotepadModal={setShowNotepadModal}
      />
    </div>
  );
};

export default OrdersPage;
