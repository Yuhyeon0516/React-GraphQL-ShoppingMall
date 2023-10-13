import { useQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import { GET_CART } from '../../graphql/cart';
import { Cart } from '../../types/types';
import CartItem from '../../components/cart/item';
import { CartContainer } from '../../styles/styles';

export default function CartPage() {
    const { data } = useQuery<{ [key: string]: Cart }>(QueryKeys.CART, () => graphqlFetcher<{ [key: string]: Cart }>(GET_CART), {
        staleTime: 0,
        cacheTime: 1000,
    });

    if (!data) return '장바구니가 비었어요';

    const cartItems = Object.values(data);

    return (
        <CartContainer>
            <h1>장바구니</h1>

            {cartItems.length ? cartItems.map((item, index) => <CartItem {...item} key={index} />) : <h1>장바구니에 담긴 항목이 없습니다.</h1>}
        </CartContainer>
    );
}
