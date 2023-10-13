import { useQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import { GET_CART } from '../../graphql/cart';
import { Cart } from '../../types/types';
import CartItem from '../../components/cart/item';
import { CartContainer } from '../../styles/styles';
import { SyntheticEvent, useRef } from 'react';

export default function CartPage() {
    const { data } = useQuery<{ [key: string]: Cart }>(QueryKeys.CART, () => graphqlFetcher<{ [key: string]: Cart }>(GET_CART), {
        staleTime: 0,
        cacheTime: 1000,
    });
    const formRef = useRef<HTMLFormElement | null>(null);

    if (!data) return '장바구니가 비었어요';

    const cartItems = Object.values(data);

    function handleCheckboxChanged(e: SyntheticEvent) {
        if (!formRef.current) return;
        const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>('.cart-item__checkbox');
        const targetInput = e.target as HTMLInputElement;
        const data = new FormData(formRef.current);
        const selectedItemCount = data.getAll('select-item').length;

        if (targetInput.classList.contains('select-all')) {
            const allChecked = targetInput.checked;
            checkboxes.forEach((checkbox) => {
                if (allChecked) checkbox.checked = true;
                else checkbox.checked = false;
            });
        } else {
            const allChecked = selectedItemCount === cartItems.length;
            formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked;
        }
    }

    return (
        <CartContainer>
            <h1>장바구니</h1>

            {cartItems.length ? (
                <form ref={formRef} onChange={handleCheckboxChanged}>
                    <label>
                        <input className="select-all" name="select-all" type="checkbox" />
                        전체 선택
                    </label>
                    {cartItems.map((item, index) => (
                        <CartItem {...item} key={index} />
                    ))}
                </form>
            ) : (
                <h1>장바구니에 담긴 항목이 없습니다.</h1>
            )}
        </CartContainer>
    );
}
