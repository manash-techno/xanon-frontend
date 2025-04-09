import { PaginationControls } from "@/components/common/PaginationControls.tsx";
import { AssetsConfig } from "@/config/assetsConfig.ts";
import { formatShortDate, formatTime } from "@/lib/utils.ts";
import { CountryFilter } from "@/pages/dashboard/OrdersPage/CountryFilter.tsx";
import { FulfillmentFilter } from "@/pages/dashboard/OrdersPage/FulfillmentFilter.tsx";
import { useGetOrdersQuery } from "@/store/api/orderApi.ts";
import { useGetShipmentQuery } from "@/store/api/shipmentApi";
import {
  setCurrentPage
} from "@/store/slices/orderSlice.ts";
import { RootState } from "@/store/store.ts";
import { iOrder } from "@/types/orderTypes";
import { Box, Typography } from "@mui/material";
import { JSX, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import InvetoryDetailsOrdersPage from "./Orders";
import InvetoryDetailsReplenishmentsPage from "./Replenishments";

const OrdersPage: () => JSX.Element = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const id = pathname.split("/").pop();
  const [tab, setTab] = useState<"orders" | "replenishments">("orders");

  const {
    selectedStatus,
    selectedCountry,
    startDate,
    endDate,
    fulfillmentChannel,
    currentPage,
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
    search: id,
    country: selectedCountry?.marketplace_id,
    fulfillmentChannel,
  });

  const {
    data: shipmentData,
    isFetching: shipmentIsFetching,
    isSuccess: shipmentIsSuccess,
    isError: shipmentIsError,
    error: shipmentError,
  } = useGetShipmentQuery({
    page: currentPage,
    status: selectedStatus,
    search: id,
    country: selectedCountry?.marketplace_id,
    purchase_date_before: endDate,
    purchase_date_after: startDate,
  });

  const productDetails = useMemo(() => {
    if (isSuccess) {
      return orderData?.results?.flatMap((order: iOrder) =>
        order.order_items?.map((item) => ({
          ...item,
          item_price: item.item_price,
        }))
      );
    }
  }, [orderData, isSuccess]);

  const orders = useMemo(
    () =>
      isSuccess
        ? orderData?.results?.map((order: iOrder) => ({
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

  const shipmentItems = useMemo(() => {
    if (!shipmentIsSuccess || !shipmentData?.results) return [];

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
  }, [shipmentData, shipmentIsSuccess]);


  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <img
          src={AssetsConfig.icons.back.src}
          width={20}
          height={20}
          alt={AssetsConfig.icons.back.alt}
          className="cursor-pointer"
        />
        <h1 className="text-[#1E1E1E] dark:text-[#F2F2F2] font-bold text-xl">
          Inventory detail
        </h1>
      </div>

      <div className="flex items-center mb-6 space-x-5">
        {/* Filter by Country */}
        <CountryFilter />

        {/* Filter by Fulfillment */}
        <FulfillmentFilter />
      </div>
      <Box className="flex flex-wrap -m-[15px] mb-6">
        <Box className="w-full lg:max-w-[50%] p-[15px]">
          <Box className="flex gap-4 items-center">
            <Box className="bg-[#F0F0F0] dark:bg-[#292929] w-[60px] h-[60px] rounded-[6px] flex items-center justify-center flex-[0_0_auto]">
              <img src={productDetails?.[0]?.image_url} alt="" />
            </Box>
            <Box className="">
              <Typography className="text-[#1E1E1E] dark:text-[#fff]">
                {productDetails?.[0]?.title}
              </Typography>
              <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                {productDetails?.[0]?.seller_sku}
              </Typography>
              <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
              {productDetails?.[0]?.asin}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="w-full lg:max-w-[50%] p-[15px]">
          <Box className="flex flex-wrap">
            <Box className="w-full max-w-[120px]">
              <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
                New
              </Typography>
              <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                Beauty
              </Typography>
            </Box>
            <Box className="w-full max-w-[120px]">
              <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
                Pending
              </Typography>
              <Typography className="text-[#6E8091] text-[14px] dark:text-[#828282]">
                Amazon.uk
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="w-full lg:max-w-[50%] p-[15px]">
          <Box className="flex flex-wrap -mx-[20px]">
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
                  Available - 🇬🇧UK
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
                  46
                </Typography>
              </Box>
            </Box>
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
                  Price
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#1E1E1E]  dark:text-[#fff]">
                  £8.14
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-wrap -mx-[20px]">
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Inbound
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  0
                </Typography>
              </Box>
            </Box>
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  CoG
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  £5.50
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-wrap -mx-[20px]">
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Processing
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  1
                </Typography>
              </Box>
            </Box>
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Fees
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  £2.19
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-wrap -mx-[20px]">
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Buy box price
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  £7.99
                </Typography>
              </Box>
            </Box>
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  VAT
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  £0.44
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="flex flex-wrap -mx-[20px]">
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Position
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  4 (4)
                </Typography>
              </Box>
            </Box>
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Profit
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  £0.01
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-wrap -mx-[20px]">
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Buy Box Last Seen
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Jun 26, 24 <br />
                  12:20AM
                </Typography>
              </Box>
            </Box>
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Margin
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  0.15%
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-wrap -mx-[20px]">
            <Box className="flex w-full max-w-[50%] px-[20px]">
              <Box className="w-full max-w-[120px]">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Last Order
                </Typography>
              </Box>
              <Box className="w-full max-w-[120px] text-right">
                <Typography className="text-[#6E8091]  dark:text-[#fff]">
                  Jun 26, 24 <br />
                  12:20AM
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="w-full lg:max-w-[50%] p-[15px] flex flex-col gap-3">
          <Box className="">
            <Box className="text-[12px] mb-1  dark:text-[#fff]">Notepad</Box>
            <textarea
              id="message"
              rows={5}
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-[transparent] dark:border-[#4F4F4F] dark:placeholder-[#B4B4B4] 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ resize: "none" }}
              placeholder="Description"
            ></textarea>
          </Box>
          <Box className="flex gap-4 pb-4">
            <button
              // onClick={() => setShowNotepadModal(false)}
              type="button"
              className="cursor-pointer bg-[#F0F0F0] dark:bg-[#292929] hover:bg-gray-400 
              text-[#6E8091] dark:text-[#696969] text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
            >
              Save
            </button>
            <button
              // onClick={() => setShowNotepadModal(false)}
              type="button"
              className="cursor-pointer bg-[transparent] hover:bg-[#F0F0F0] text-[#6E8091] dark:text-[#828282] text-[12px] font-medium p-0 rounded 
              inline-flex items-center w-[100px] h-[36px] justify-center"
            >
              Save
            </button>
          </Box>
        </Box>
      </Box>

      <div>
        <button onClick={() => setTab("orders")} className={`p-2 cursor-pointer ${tab === "orders" ? "font-semibold" : ""}`}>
          Orders
        </button>
        <button onClick={() => setTab("replenishments")} className={`p-2 cursor-pointer ${tab === "replenishments" ? "font-semibold" : ""}`}>
          Replenishments
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">

        {tab === "orders" && <InvetoryDetailsOrdersPage orders={orders} isFetching={isFetching} isError={isError} error={error} />}
        {tab === "replenishments" && <InvetoryDetailsReplenishmentsPage shipmentItems={shipmentItems} isFetching={shipmentIsFetching} isError={shipmentIsError} error={shipmentError} />}
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        totalPages={orderData?.count ? Math.ceil(orderData.count / 10) : 1}
      />
    </div>
  );
};

export default OrdersPage;
