import { parseDateToStandardFormat } from "@/lib/utils.ts";
import { apiSlice } from "@/store/slices/apiSlice";
import { RepriceList, RepriceRules } from "@/types/repriceTypes";

export const repriceApi = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getReprices: builder.query<{ results: RepriceList[]; count: number; next?: string; previous?: string }, {
            page: number;
            order_status?: string;
            repricing_date__lt?: string | null;
            repricing_date__gt?: string | null;
            search?: string;
            country?: string;
            fulfillmentChannel?: string;
        }>({
            query: ({ page, order_status = "", repricing_date__lt = "", repricing_date__gt = "", search = "", country = "", fulfillmentChannel = "" }) => ({
                url: `/amazon/listings/`,
                method: "GET",
                params: {
                    page,
                    order_status,
                    repricing_date__lt: parseDateToStandardFormat(repricing_date__lt) ?? '',
                    repricing_date__gt: parseDateToStandardFormat(repricing_date__gt) ?? '',
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
        getPricingRules: builder.query<{ results: RepriceRules[]; count: number; next?: string; previous?: string }, void>({
            query: () => ({
                url: `/amazon/repricing_rules/`,
                method: "GET",
            }),
            transformResponse: (response: { results: RepriceRules[]; count: number; next?: string; previous?: string }) => ({
                count: response.count,
                next: response.next,
                previous: response.previous,
                results: response.results
            }),
        }),
        addRepriceRule: builder.mutation<RepriceRules, Omit<RepriceRules, "id">>({
            query: (body) => ({
                url: `/amazon/repricing_rules/`,
                method: "POST",
                body,
            }),
        }),
    }),
})

export const { useGetRepricesQuery, useGetPricingRulesQuery, useAddRepriceRuleMutation } = repriceApi;
