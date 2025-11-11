import type { Product } from "./product";

export interface Shipping {
    id: number;
    type: string;
    address?: string;
}

export interface OrderDetail {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    product: Product;
    shipping_cost: number;
}

export interface Order {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    customer_name: string;
    customer_phone: string;
    shipping_id: number;
    created_at: string;
    updated_at: string;
    shipping: Shipping;
    order_details: OrderDetail[];
}