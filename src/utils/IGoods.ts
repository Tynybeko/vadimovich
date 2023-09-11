
export interface Item {
    id: number;
    title: string;
    description: string;
    description_ky: string;
    content: string;
    content_ky: string;
    category: string;
    price: number;
    photo: string;
    created_date: string;
    discount: number;
    sizes: any[];
    discounted_price: number;
    buySize: buySize[]
}



export interface buySize {
    product: number,
    quantity: number,
    sizeitem: string,
    price: number
}