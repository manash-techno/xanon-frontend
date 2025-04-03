import { Expense } from "@/types/expensesTypes";
import { apiSlice } from "../slices/apiSlice";

export const expensesApi = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        getExpenses: builder.query<{
           count: number;
           next?: string;
           previous?: string;
           results: Expense[]
        },{
            page: number;
            search: string;
            category: string;
            purchase_date_before: string | null;
            purchase_date_after: string | null;
        }>({
            query: ({page, search="", category="", purchase_date_before="", purchase_date_after=""}) => ({
                url: '/expenses/',
                method: 'GET',
                params: {
                    page,
                    search,
                    category,
                    date__gt: purchase_date_after,
                    date__lt: purchase_date_before,
                }
            }),
             transformResponse: (response: {
                            results: Expense[];
                            count: number;
                            next?: string;
                            previous?: string;
                        }) => ({
                            count: response.count,
                            next: response.next,
                            previous: response.previous,
                            results: response.results,
                        }),
                        providesTags: ["Expenses"],
        })  
    })
})

export const { useGetExpensesQuery } = expensesApi