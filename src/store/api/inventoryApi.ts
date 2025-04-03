import { apiSlice } from "@/store/slices/apiSlice";
import { iInventoryItem } from "@/types/inventoryTypes";

export const inventoryApi = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getInventory: builder.query<{
            results: iInventoryItem[];
            count: number;
            next?: string;
            previous?: string;
        }, {
            page: number;
            status?: string;
            search?: string;
            country?: string;
        }>({
            query: ({ page, status = "", search = "", country = "" }) => ({
                url: "/amazon/inventory/",
                method: "GET",
                params: {
                    page,
                    status,
                    search,
                    marketplace_id: country,
                },
            }),
            transformResponse: (response: {
                results: iInventoryItem[];
                count: number;
                next?: string;
                previous?: string;
            }) => ({
                count: response.count,
                next: response.next,
                previous: response.previous,
                results: response.results,
            }),
            providesTags: ["Inventory"],
        }),
    }),
});

export const { useGetInventoryQuery} = inventoryApi;
