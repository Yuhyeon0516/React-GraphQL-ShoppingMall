import { useInfiniteQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import ProductItem from '../../components/product/item';
import { FloatingButton, ProductListContainer } from '../../styles/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { GET_PRODUCTS } from '../../graphql/products';
import { Products } from '../../types/types';
import { useEffect, useRef } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

export default function ProductList() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<Products>(
        QueryKeys.PRODUCTS,
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
            <ProductListContainer>
                {data?.pages.map((page) =>
                    page.products.map((product) => {
                        return <ProductItem {...product} key={product.id} />;
                    }),
                )}
                <FloatingButton>
                    <FontAwesomeIcon icon={faPlus} fontSize={18} color="white" />
                </FloatingButton>
            </ProductListContainer>
            <div ref={fetchMoreRef} />
        </>
    );
}
