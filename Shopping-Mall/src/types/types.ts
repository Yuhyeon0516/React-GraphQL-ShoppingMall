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
    imageUrl: string;
    price: number;
    title: string;
    amount: number;
}
