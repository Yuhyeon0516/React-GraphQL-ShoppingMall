import { QueryClient } from 'react-query';
import { FetcherPropsType } from '../types/types';
import request, { RequestDocument } from 'graphql-request';

export const getClient = (() => {
    let client: QueryClient | null = null;
    return () => {
        if (!client)
            client = new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        refetchOnMount: false,
                        refetchOnReconnect: false,
                        cacheTime: 1000 * 60 * 60 * 24,
                        staleTime: 1000 * 60,
                    },
                },
            });
        return client;
    };
})();

const BASE_URL = 'https://localhost:8000/graphql';

export async function fetcher({ method, path, body, params }: FetcherPropsType) {
    try {
        let url = `${BASE_URL}${path}`;
        const fetchOptions: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': BASE_URL,
            },
        };

        if (params) {
            const searchParams = new URLSearchParams(params);
            url += searchParams.toString();
        }

        if (body) fetchOptions.body = JSON.stringify(body);

        const res = await fetch(url, fetchOptions);
        const json = await res.json();

        return json;
    } catch (error) {
        console.log(error);
    }
}

const GRAPHQL_BASE_URL = 'http://localhost:8000/graphql';

export async function graphqlFetcher<T>(query: RequestDocument, variables = {}) {
    return request<T>(GRAPHQL_BASE_URL, query, variables);
}

export const QueryKeys = {
    PRODUCTS: 'PRODUCTS',
    CART: 'CART',
};
