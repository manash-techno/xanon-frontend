export interface iShipment {
    id: number;
    shipment_name: string;
    shipment_date: string;
    shipment_id: string;
    tracking_id: string | null;
    shipment_status: string;
    ship_from_address: {
        City: string;
        Name: string;
        PostalCode: string;
        CountryCode: string;
        AddressLine1: string;
        StateOrProvinceCode: string;
    };
    market_place_id: string;
    market_place: {
        country: string;
        marketplace_id: string;
        country_code: string;
        sales_channel: string;
        currency: string;
    };
    destination_fulfillment_center_id: string;
    items: ShipmentItems[];
}

export interface ShipmentItems {
    id: number;
    sku: string;
    asin: string;
    cost_of_goods: string;
    quantity_shipped: number;
    title: string;
    image_url: string;
    unit_cost: number | null;
    vat_cog: number | null;
}

export interface iShipmentStatus {
    name: string;
    value: string;
}

