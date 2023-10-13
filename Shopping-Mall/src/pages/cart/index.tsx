import { useQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import { GET_CART } from '../../graphql/cart';
import { Cart } from '../../types/types';
import CartItem from '../../components/cart/item';
import { CartContainer } from '../../styles/styles';
import { SyntheticEvent, createRef, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../recoil/cart';

export default function CartPage() {
    const [, setCheckedCartData] = useRecoilState(checkedCartState);
    const { data } = useQuery<{ [key: string]: Cart }>(QueryKeys.CART, () => graphqlFetcher<{ [key: string]: Cart }>(GET_CART), {
        staleTime: 0,
        cacheTime: 1000,
    });
    const formRef = useRef<HTMLFormElement | null>(null);

    if (!data) return '장바구니가 비었어요';

    const cartItems = Object.values(data);

    const checkboxRefs = cartItems.map(() => createRef<HTMLInputElement>());

    function handleCheckboxChanged(e: SyntheticEvent) {
        if (!formRef.current) return;

        const targetInput = e.target as HTMLInputElement;
        const data = new FormData(formRef.current);
        const selectedItemCount = data.getAll('select-item').length;

        if (targetInput.classList.contains('select-all')) {
            const allChecked = targetInput.checked;
            checkboxRefs.forEach((checkbox) => {
                checkbox.current!.checked = allChecked;
            });
        } else {
            const allChecked = selectedItemCount === cartItems.length;
            formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked;
        }

        const checkedItems = checkboxRefs
            .map((ref, i) => {
                return ref.current!.checked ? cartItems[i] : null;
            })
            .filter((v) => !!v);

        setCheckedCartData(checkedItems as Cart[]);
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
                        <CartItem {...item} key={index} ref={checkboxRefs[index]} />
                    ))}
                </form>
            ) : (
                <h1>장바구니에 담긴 항목이 없습니다.</h1>
            )}
        </CartContainer>
    );
}
