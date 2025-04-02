import { apiSlice } from "@/store/slices/apiSlice";
import { iCountry } from "@/types/inventoryTypes";
import { iShipment } from "@/types/shipmentTypes";

export const shipmentApi = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getShipment: builder.query<{
            results: iShipment[];
            count: number;
            next?: string;
            previous?: string;
        }, {
            page: number;
            status?: string;
            search?: string;
            country?: string;
            purchase_date_before?: string;
            purchase_date_after?: string;
        }>({
            query: ({ page, status = "", purchase_date_before = "", purchase_date_after = "", search = "", country = ""}) => ({
                url: "/amazon/shipments/",
                method: "GET",
                params: {
                    page,
                    shipment_status: status,
                    shipment_date__lt: purchase_date_before,
                    shipment_date__gt: purchase_date_after,
                    search,
                    marketplace_id: country,
                },
            }),
            transformResponse: (response: {
                results: iShipment[];
                count: number;
                next?: string;
                previous?: string;
            }) => ({
                count: response.count,
                next: response.next,
                previous: response.previous,
                results: response.results,
            }),
            providesTags: ["Shipment"],
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

export const { useGetShipmentQuery, useGetMarketplaceCountriesQuery } = shipmentApi;
