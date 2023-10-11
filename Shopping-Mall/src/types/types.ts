export interface AnyOBJ {
    [key: string]: any;
}

export interface FetcherPropsType {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    body?: AnyOBJ;
    params?: AnyOBJ;
}

interface ProductCategory {
    id: number;
    name: string;
    image: string;
    creationAt: Date;
    updatedAt: Date;
}

export interface ProductItemType {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    creationAt: Date;
    updatedAt: Date;
    category: ProductCategory;
}
