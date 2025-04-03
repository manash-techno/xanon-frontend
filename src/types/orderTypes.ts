
export interface iMarketplace {
    country: string;
    marketplace_id: string;
    country_code: string;
    sales_channel: string;
    currency: string;
}
export interface iOrderItem {
    id: number;
    title: string;
    asin: string;
    seller_sku: string;
    quantity_ordered: number;
    item_price: string;
    vat: string;
    roi: string;
    item_currency_code: string;
    cost_of_goods: string;
    fees: string;
    profit: string;
    margin: string;
    condition: string;
    image_url: string;
    inventory: number;
    created_at: string;
    updated_at: string;
}

export interface iOrder {
    id: number;
    amazon_order_id: string;
    purchase_date: string;
    order_status: string;
    order_total_amount: string;
    order_total_currency_code: string;
    order_type: string;
    number_of_items_shipped: number;
    marketplace_id: string;
    market_place: iMarketplace;
    refund_date: string | null;
    sales_channel: string;
    fulfillment_channel: string;
    created_at: string;
    updated_at: string;
    order_items: iOrderItem[];
}

export interface iOrderStatus {
    name: string;
    value: string;
}
