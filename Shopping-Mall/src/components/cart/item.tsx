import { useMutation } from 'react-query';
import { Cart } from '../../types/types';
import { UPDATE_CART } from '../../graphql/cart';
import { QueryKeys, getClient, graphqlFetcher } from '../../utils/queryClient';
import { SyntheticEvent } from 'react';
import { CartItemContainer, CartItemImage, CartItemTextContainer, CartItemType } from '../../styles/styles';

export default function CartItem({ id, title, price, amount, imageUrl }: Cart) {
    const queryClient = getClient();
    const { mutate: updateCart } = useMutation(({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }));

    function handleUpdateAmount(e: SyntheticEvent) {
        const value = Number((e.target as HTMLInputElement).value);
        updateCart(
            { id, amount: value },
            {
                onSuccess: (newValue) => {
                    queryClient.setQueryData(QueryKeys.CART, newValue);
                },
            },
        );
    }

    return (
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt="image" />
            <CartItemTextContainer>
                <CartItemType>상품명</CartItemType>
                <div>{title}</div>
            </CartItemTextContainer>

            <CartItemTextContainer>
                <CartItemType>상품당 가격</CartItemType>
                <div>$ {price}</div>
            </CartItemTextContainer>

            <CartItemTextContainer>
                <CartItemType>개수</CartItemType>
                <input type="number" value={amount} onChange={handleUpdateAmount} />
            </CartItemTextContainer>

            <CartItemTextContainer>
                <CartItemType>합계</CartItemType>
                <div>$ {price * amount}</div>
            </CartItemTextContainer>
        </CartItemContainer>
    );
}
