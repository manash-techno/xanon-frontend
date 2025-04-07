export interface iInventoryItem {
    id: string;
    title: string;
    image_url: string;
    buy_box_last_seen: string | null;
    buy_box_last_price: string | null;
    fc_processing_quantity: number;
    position: string | null;
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
    marketplace_id: string;
    market_place: {
        sales_channel: string;
        country: string;
        country_code: string;
        marketplace_id: string;
        currency: string;
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
