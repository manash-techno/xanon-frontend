export type Expense = {
    id: string;
    date: string;
    amount: string;
    vat: string;
    description: string;
    category: string;
    recur: string;
}

export interface iExpenseStatus {
    name: string;
    value: string;
}

