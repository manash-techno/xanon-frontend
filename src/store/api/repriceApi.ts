import { parseDateToStandardFormat } from "@/lib/utils.ts";
import { apiSlice } from "@/store/slices/apiSlice";
import { createRepriceRules, RepriceList, RepriceRules } from "@/types/repriceTypes";

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
        addRule: builder.mutation<RepriceRules, createRepriceRules>({
            query: (body) => ({
                url: `/amazon/repricing_rules/`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Reprice"],
        }),
        getRule: builder.query<RepriceRules, string>({
            query: (id) => ({
                url: `/amazon/repricing_rules/${id}/`,
                method: "GET",
            }),
            transformResponse: (response: RepriceRules) => ({
                ...response,
                id: response.id.toString(),
                min_roi_30_days: response.min_roi_30_days ? response.min_roi_30_days.toString() : "",
                min_roi_60_days: response.min_roi_60_days ? response.min_roi_60_days.toString() : "",
                min_roi: response.min_roi ? response.min_roi.toString() : "",
                max_roi: response.max_roi ? response.max_roi.toString() : "",
                abs_min_roi: response.abs_min_roi ? response.abs_min_roi.toString() : "",
                prime_adjustment_value: response.prime_adjustment_value ? response.prime_adjustment_value.toString() : "",
                non_prime_next_day_adjustment_value: response.non_prime_next_day_adjustment_value ? response.non_prime_next_day_adjustment_value.toString() : "",
                non_prime_adjustment_value: response.non_prime_adjustment_value ? response.non_prime_adjustment_value.toString() : "",
                is_min_roi_30_days: response.is_min_roi_30_days ? Boolean(response.is_min_roi_30_days) : false,
                is_min_roi_60_days: response.is_min_roi_60_days ? Boolean(response.is_min_roi_60_days) : false,
            }),
        }),
        updateRule: builder.mutation<RepriceRules, { id: string; rule: createRepriceRules }>({
            query: ({ id, rule }) => ({
                url: `/amazon/repricing_rules/${id}/`,
                method: "PATCH",
                body: rule,
            }),
            invalidatesTags: ["Reprice"],
        }),
    }),
})

export const { useGetRepricesQuery, useGetPricingRulesQuery, useAddRuleMutation, useGetRuleQuery, useUpdateRuleMutation } = repriceApi;
