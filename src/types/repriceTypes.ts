export interface RepriceRules {
    id: string;
    rule_name: string;
    is_default: boolean;
    guard_prevent_below_prime: boolean;
    guard_prevent_below_non_prime: boolean;
    prime_adjustment_type: string;
    prime_adjustment_value: string | number | null;
    prime_next_day_adjustment_value: string | number | null;
    non_prime_next_day_adjustment_type: string;
    non_prime_next_day_adjustment_value: string;
    prime_next_day_adjustment_type: string;
    non_prime_adjustment_type: string;
    non_prime_adjustment_value: string | number | null;
    min_roi: string | null;
    max_roi: string | null;
    abs_min_roi: string | null;
    is_min_roi_30_days: boolean;
    min_roi_30_days: string | null;
    is_min_roi_60_days: boolean;
    min_roi_60_days: string | null;
    exclude_amazon: boolean;
    exclude_merchant: boolean;
    exclude_amazon_eu: boolean;
    no_order_30: boolean;
    no_order_30_rule: string | null;
    no_order_60: boolean;
    no_order_60_rule: string | null;
    no_order_90: boolean;
    no_order_90_rule: string | null;
    stock_drop_20: boolean;
    stock_drop_20_rule: string | null;
    stock_drop_50: boolean;
    stock_drop_50_rule: string | null;
    stock_drop_90: boolean;
    stock_drop_90_rule: string | null;
    stock_age_30: boolean;
    stock_age_30_rule: string | null;
    stock_age_60: boolean;
    stock_age_60_rule: string | null;
    stock_age_90: boolean;
    stock_age_90_rule: string | null;
}

export interface createRepriceRules {
    rule_name: string;
    min_roi: string,
    max_roi: string,
    abs_min_roi: string,

    prime_adjustment_type: string;
    prime_adjustment_value: string | null;
    non_prime_next_day_adjustment_type: string;
    non_prime_next_day_adjustment_value: string | null;
    non_prime_adjustment_type: string;
    non_prime_adjustment_value: string | null;

    is_min_roi_30_days?: boolean;
    min_roi_30_days?: string;
    is_min_roi_60_days?: boolean;
    min_roi_60_days?: string;

    exclude_amazon?: boolean;
    exclude_amazon_eu?: boolean;
    exclude_sellers?: boolean;

    guard_prevent_below_prime?: boolean,
    guard_prevent_below_non_prime?: boolean,

    automation_condition_order: string,
    automation_condition_stock_drop: string,
    automation_condition_stock_age: string,
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

export interface iOrderStatus {
    name: string;
    value: string;
}
