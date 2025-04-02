import { apiSlice } from "@/store/slices/apiSlice";
import { iOrder, iCountry } from "@/types/orderTypes";
import {parseDateToStandardFormat} from "@/lib/utils.ts";

export const orderApi = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getOrders: builder.query<{ results: iOrder[]; count: number; next?: string; previous?: string }, {
            page: number;
            order_status?: string;
            purchase_date_before?: string|null;
            purchase_date_after?: string|null;
            search?: string;
            country?: string;
            fulfillmentChannel?: string;
        }>({
            query: ({ page, order_status = "", purchase_date_before = "", purchase_date_after = "", search = "", country = "", fulfillmentChannel = "" }) => ({
                url: `/amazon/orders/`,
                method: "GET",
                params: {
                    page,
                    order_status,
                    purchase_date_before: parseDateToStandardFormat(purchase_date_before)?? '',
                    purchase_date_after: parseDateToStandardFormat(purchase_date_after) ?? '',
                    search,
                    marketplace_id: country,
                    fulfillment_channel: fulfillmentChannel,
                },
            }),
            transformResponse: (response: { results: iOrder[]; count: number; next?: string; previous?: string }) => ({
                count: response.count,
                next: response.next,
                previous: response.previous,
                results: response.results
            }),
            providesTags: ["Orders"],
        }),

        getMarketplaceCountries: builder.query<iCountry[], void>({
            query: () => ({
                url: "/amazon/orders/marketplace_filter_list/",
                method: "GET",
            }),
            providesTags: ["Countries"],
        }),
    }),
});

export const { useGetOrdersQuery, useGetMarketplaceCountriesQuery } = orderApi;
