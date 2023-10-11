import { QueryClient } from 'react-query';
import { FetcherPropsType } from '../types/types';

export const getClient = (() => {
    let client: QueryClient | null = null;
    return () => {
        if (!client)
            client = new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            });
        return client;
    };
})();

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export async function fetcher({ method, path, body, params }: FetcherPropsType) {
    try {
        const url = `${BASE_URL}${path}`;
        const fetchOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': BASE_URL,
            },
        };
        const res = await fetch(url, fetchOptions);
        const json = await res.json();

        return json;
    } catch (error) {
        console.log(error);
    }
}

export const QueryKeys = {
    PRODUCTS: 'PRODUCTS',
};
