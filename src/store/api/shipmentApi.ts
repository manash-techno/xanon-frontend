import { parseDateToStandardFormat } from "@/lib/utils";
import { apiSlice } from "@/store/slices/apiSlice";
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
            purchase_date_before?: string | null;
            purchase_date_after?: string | null;
        }>({
            query: ({ page, status = "", purchase_date_before = "", purchase_date_after = "", search = "", country = ""}) => ({
                url: "/amazon/shipments/",
                method: "GET",
                params: {
                    page,
                    shipment_status: status,
                    shipment_date__lt: parseDateToStandardFormat(purchase_date_before),
                    shipment_date__gt: parseDateToStandardFormat(purchase_date_after),
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
    }),
});

export const { useGetShipmentQuery } = shipmentApi;
