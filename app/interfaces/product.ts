export interface Product {
    id: number;
    name: string;
    price: number;
    unit: string;
    price_sale_to_business: number;
    wholesale_price: number;
    wholesale_price_starting_at: number | null;
    createdAt: string;
    updatedAt: string;
}