export interface iInventoryItem {
    id: string;
    image: string;
    product: string;
    sku: string;
    asin: string;
    condition: string;
    category: string;
    status: string;
    total_quantity: number;
    inbound_quantity: number;
    buy_box_price: string;
    last_order_date: string;
    sales_channel: string;
    marketplace: {
        country: string;
        country_code: string;
    };
    price: number;
    cost_of_goods: string;
    fees: string;
    vat: string;
    profit: string;
    roi: string;
    margin: string;
}

export interface iInventoryStatus {
    name: string;
    value: string;
}
