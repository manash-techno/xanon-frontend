export interface RepriceRules {
    id: string;
    rule_name: string;
    is_default: boolean;
    guard_prevent_below_prime: boolean;
    guard_prevent_below_non_prime: boolean;
    prime_adjustment_type: string;
    prime_adjustment_value: string;
    non_prime_next_day_adjustment_type: string;
    non_prime_next_day_adjustment_value: string;
    non_prime_adjustment_type: string;
    non_prime_adjustment_value: string;
    min_roi: string;
    max_roi: string;
    abs_min_roi: string;
    is_min_roi_30_days: boolean;
    min_roi_30_days: string;
    is_min_roi_60_days: boolean;
    min_roi_60_days: string;
}

export interface RepriceList {
    id: string;
    marketplace_id: string;
    rule: string;
    market_place: {
        country: string;
        market_place_id: string;
        country_code: string;
        sales_channel: string;
    },
    asin: string;
    title: string;
    sku: string;
    old_price: string;
    price: string;
    currency_code: string;
    fulfillment_channel_code: string;
    condition: string;
    image_url: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    cog: string;
    vat: string;
    roi: string;
    fees: string;
    profit: string;
    margin: string;
    min_price: string;
    max_price: string;
    min_profit: string;
    max_profit: string;
    min_roi: string;
    max_roi: string;
    min_margin: string;
    max_margin: string;
}

export interface iCountry {
    country: string;
    marketplace_id: string;
    country_code: string;
    sales_channel: string;
    currency: string;
}

export interface iOrderStatus {
    name: string;
    value: string;
}
