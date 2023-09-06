export interface Item {
    id: number;
    title: string;
    description: string;
    description_ky: string;
    content: string;
    content_ky: string;
    category: number;
    price: number;
    photo: string;
    created_date: string;
    discount: number;
    sizes: any[]; // You can replace 'any[]' with the actual type for sizes if known
    discounted_price: number;
}