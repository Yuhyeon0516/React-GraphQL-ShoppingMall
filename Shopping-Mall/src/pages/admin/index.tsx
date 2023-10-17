import { useInfiniteQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import { FloatingButton, ProductListContainer } from '../../styles/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { GET_PRODUCTS } from '../../graphql/products';
import { Products } from '../../types/types';
import { useEffect, useRef } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import AdminItem from '../../components/admin/item';
import AddForm from '../../components/admin/addForm';

export default function AdminPage() {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<Products>(
        [QueryKeys.PRODUCTS, true],
        ({ pageParam = '' }) => graphqlFetcher<Products>(GET_PRODUCTS, { cursor: pageParam, showDeleted: true }),
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
            <h1>어드민</h1>
            <AddForm />
            <ProductListContainer>
                {data?.pages.map((page) =>
                    page.products.map((product) => {
                        return <AdminItem {...product} key={product.id} />;
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
