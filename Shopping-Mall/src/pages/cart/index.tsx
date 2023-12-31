import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import { Cart } from '../../types/types';
import { useQuery } from 'react-query';
import { GET_CART } from '../../graphql/cart';
import CartList from '../../components/cart/list';

export default function CartPage() {
    const { data } = useQuery<{ cart: Cart[] }>(QueryKeys.CART, () => graphqlFetcher<{ cart: Cart[] }>(GET_CART), {
        staleTime: 0,
        cacheTime: 1000,
    });

    if (!(data?.cart || []).length) return <h1>장바구니에 담긴 항목이 없습니다.</h1>;

    const cartItems = data?.cart || [];

    return <CartList cartItems={cartItems} />;
}
