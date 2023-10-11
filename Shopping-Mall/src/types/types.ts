export type AnyOBJ = {
    [key: string]: any;
};

export interface FetcherPropsType {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    path: string;
    body?: AnyOBJ;
    params?: AnyOBJ;
}
