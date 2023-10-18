import { useMutation } from 'react-query';
import { Cart } from '../../types/types';
import { DELETE_CART, UPDATE_CART } from '../../graphql/cart';
import { QueryKeys, getClient, graphqlFetcher } from '../../utils/queryClient';
import { ForwardedRef, SyntheticEvent, forwardRef } from 'react';
import { CartItemContainer, CartItemImage, CartItemRemoveIcon, CartItemTextContainer, CartItemType } from '../../styles/styles';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function CartItem({ id, amount, product: { title, price, imageUrl, createdAt } }: Cart, ref: ForwardedRef<HTMLInputElement>) {
    const queryClient = getClient();
    const { mutate: updateCart } = useMutation(({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }));
    const { mutate: deleteCart } = useMutation(({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }));

    function handleUpdateAmount(e: SyntheticEvent) {
        const value = Number((e.target as HTMLInputElement).value);
        if (amount < 1) return;
        updateCart(
            { id, amount: value },
            {
                onSuccess: (newValue) => {
                    const prevCart = queryClient.getQueryData<{ cart: Cart[] }>(QueryKeys.CART);
                    const targetIndex = prevCart?.cart.findIndex((cartItem) => cartItem.id === id);
                    if (!prevCart || targetIndex === undefined || targetIndex < 0) return;

                    const newCart = newValue as { updateCart: Cart };
                    const updateCart = [...prevCart.cart];
                    updateCart.splice(targetIndex, 1, newCart.updateCart);

                    queryClient.setQueryData(QueryKeys.CART, { cart: updateCart });
                },
            },
        );
    }

    function handleDeleteItem() {
        deleteCart(
            { id },
            {
                onSuccess: (newValue) => {
                    const prevCart = queryClient.getQueryData<{ cart: Cart[] }>(QueryKeys.CART);
                    const removeCart = newValue as { deleteCart: string };
                    if (!prevCart) return;

                    const targetIndex = prevCart.cart.findIndex((cartItem) => cartItem.id === removeCart.deleteCart);
                    if (targetIndex < 0) return;

                    const newCart = [...prevCart.cart];
                    newCart.splice(targetIndex, 1);

                    queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
                },
            },
        );
    }

    return (
        <CartItemContainer>
            <input type="checkbox" name={`select-item`} className="cart-item__checkbox" ref={ref} disabled={createdAt === null} />
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
                {createdAt ? (
                    <input type="number" value={amount} onChange={handleUpdateAmount} min={1} />
                ) : (
                    <div style={{ color: 'red', fontWeight: 'bold' }}>판매중지 된 상품입니다.</div>
                )}
            </CartItemTextContainer>

            <CartItemTextContainer>
                <CartItemType>합계</CartItemType>
                <div>$ {price * amount}</div>
            </CartItemTextContainer>

            <CartItemRemoveIcon icon={faTrashCan} onClick={handleDeleteItem} />
        </CartItemContainer>
    );
}

export default forwardRef(CartItem);
