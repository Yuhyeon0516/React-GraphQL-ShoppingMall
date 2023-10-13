import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import { Cart } from '../../types/types';
import { useQuery } from 'react-query';
import { GET_CART } from '../../graphql/cart';
import CartList from '../../components/cart/list';

export default function CartPage() {
    const { data } = useQuery<{ [key: string]: Cart }>(QueryKeys.CART, () => graphqlFetcher<{ [key: string]: Cart }>(GET_CART), {
        staleTime: 0,
        cacheTime: 1000,
    });

    if (!data) return <h1>장바구니에 담긴 항목이 없습니다.</h1>;

    const cartItems = Object.values(data);

    return <CartList cartItems={cartItems} />;
}
