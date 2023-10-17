export interface AnyOBJ {
    [key: string]: any;
}

export interface FetcherPropsType {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    body?: AnyOBJ;
    params?: AnyOBJ;
}

export interface Product {
    id: string;
    imageUrl: string;
    price: number;
    title: string;
    description: string;
    createdAt: string;
}

export interface Products {
    products: Product[];
}

export interface Cart {
    id: string;
    amount: number;
    product: Product;
}

export interface PayInfo {
    id: string;
}

export type Paymentinfos = PayInfo[];
