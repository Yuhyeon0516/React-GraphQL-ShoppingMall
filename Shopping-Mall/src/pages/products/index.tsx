import { useInfiniteQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import ProductItem from '../../components/product/item';
import { ProductListContainer } from '../../styles/styles';
import { GET_PRODUCTS } from '../../graphql/products';
import { Products } from '../../types/types';
import { useEffect, useRef } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

export default function ProductList() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<Products>(
        [QueryKeys.PRODUCTS, false],
        ({ pageParam = '' }) => graphqlFetcher<Products>(GET_PRODUCTS, { cursor: pageParam }),
        {
            getNextPageParam: (lastPage) => {
                return lastPage.products.at(-1)?.id;
            },
        },
    );
    const fetchMoreRef = useRef<HTMLDivElement | null>(null);
    const isFirstFetch = useRef(true);
    const intersecting = useInfiniteScroll(fetchMoreRef);

    useEffect(() => {
        if (!intersecting) return;
        if (isFirstFetch.current) {
            isFirstFetch.current = false;
            return;
        }
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [intersecting]);

    return (
        <>
            <h1>상품목록</h1>
            <ProductListContainer>
                {data?.pages.map((page) =>
                    page.products.map((product) => {
                        return <ProductItem {...product} key={product.id} />;
                    }),
                )}
            </ProductListContainer>
            <div ref={fetchMoreRef} />
        </>
    );
}
