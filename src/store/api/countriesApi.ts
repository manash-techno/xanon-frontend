import { apiSlice } from "@/store/slices/apiSlice";
import { iCountry } from "@/types/countriesTypes";

export const countriesApi = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getMarketplaceCountries: builder.query<iCountry[], void>({
            query: () => ({
                url: "/amazon/orders/marketplace_filter_list/",
                method: "GET",
            }),
            providesTags: ["Countries"],
        }),
    }),
});

export const { useGetMarketplaceCountriesQuery } = countriesApi;
