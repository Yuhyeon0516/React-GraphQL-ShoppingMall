import { useQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import { GET_CART } from '../../graphql/cart';
import { Cart } from '../../types/types';
import CartItem from '../../components/cart/item';

export default function CartPage() {
    const { data } = useQuery<{ [key: string]: Cart }>(QueryKeys.CART, () => graphqlFetcher<{ [key: string]: Cart }>(GET_CART), {
        staleTime: 0,
        cacheTime: 1000,
    });

    if (!data) return '장바구니가 비었어요';

    const cartItems = Object.values(data);

    return (
        <ul>
            {cartItems.map((item, index) => (
                <CartItem {...item} key={index} />
            ))}
        </ul>
    );
}
