import { parseDateToStandardFormat } from "@/lib/utils.ts";
import { apiSlice } from "@/store/slices/apiSlice";
import { RepriceList } from "@/types/repriceTypes";

export const repriceApi = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getReprices: builder.query<{ results: RepriceList[]; count: number; next?: string; previous?: string }, {
            page: number;
            order_status?: string;
            purchase_date_before?: string | null;
            purchase_date_after?: string | null;
            search?: string;
            country?: string;
            fulfillmentChannel?: string;
        }>({
            query: ({ page, order_status = "", purchase_date_before = "", purchase_date_after = "", search = "", country = "", fulfillmentChannel = "" }) => ({
                url: `/amazon/listings/`,
                method: "GET",
                params: {
                    page,
                    order_status,
                    purchase_date_before: parseDateToStandardFormat(purchase_date_before) ?? '',
                    purchase_date_after: parseDateToStandardFormat(purchase_date_after) ?? '',
                    search,
                    marketplace_id: country,
                    fulfillment_channel: fulfillmentChannel,
                },
            }),
            transformResponse: (response: { results: RepriceList[]; count: number; next?: string; previous?: string }) => ({
                count: response.count,
                next: response.next,
                previous: response.previous,
                results: response.results
            }),
            providesTags: ["Reprice"],
        }),
    }),
})

export const { useGetRepricesQuery } = repriceApi;
