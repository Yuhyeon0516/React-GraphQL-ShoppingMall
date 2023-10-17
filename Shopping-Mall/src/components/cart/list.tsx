import { Cart } from '../../types/types';
import CartItem from '../../components/cart/item';
import { CartContainer, LinkColorButton } from '../../styles/styles';
import { SyntheticEvent, createRef, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../recoil/cart';
import WillPay from '../../components/cart/willPay';

export default function CartList({ cartItems }: { cartItems: Cart[] }) {
    const [, setCheckedCartData] = useRecoilState(checkedCartState);
    const formRef = useRef<HTMLFormElement | null>(null);
    const [formData, setFormData] = useState<FormData | null>(null);

    const checkboxRefs = cartItems.map(() => createRef<HTMLInputElement>());

    // function handleCheckboxChanged(e: SyntheticEvent) {
    //     if (!formRef.current) return;

    //     const targetInput = e.target as HTMLInputElement;
    //     const data = new FormData(formRef.current);
    //     const selectedItemCount = data.getAll('select-item').length;

    //     if (targetInput.classList.contains('select-all')) {
    //         const allChecked = targetInput.checked;
    //         checkboxRefs.forEach((checkbox) => {
    //             checkbox.current!.checked = allChecked;
    //         });
    //     } else {
    //         const allChecked = selectedItemCount === cartItems.length;
    //         formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked;
    //     }

    //     setFormData(data);
    // }

    const enabledItems = cartItems.filter((item) => item.product.createdAt);

    const setAllCheckedFromItems = () => {
        // 개별아이템 선택시
        if (!formRef.current) return;
        const data = new FormData(formRef.current);
        const selectedCount = data.getAll('select-item').length;
        const allChecked = selectedCount === enabledItems.length;
        formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked;
    };

    const setItemsChckedFromAll = (targetInput: HTMLInputElement) => {
        const allChecked = targetInput.checked;
        checkboxRefs
            .filter((inputElem) => {
                return !inputElem.current!.disabled;
            })
            .forEach((inputElem) => {
                inputElem.current!.checked = allChecked;
            });
    };

    const handleCheckboxChanged = (e?: SyntheticEvent) => {
        if (!formRef.current) return;
        const targetInput = e?.target as HTMLInputElement;
        if (targetInput && targetInput.classList.contains('select-all')) {
            setItemsChckedFromAll(targetInput);
        } else {
            setAllCheckedFromItems();
        }
        const data = new FormData(formRef.current);
        setFormData(data);
    };

    useEffect(() => {
        const checkedItems = checkboxRefs
            .map((ref, i) => {
                return ref.current!.checked ? cartItems[i] : null;
            })
            .filter((v) => !!v);

        setCheckedCartData(checkedItems as Cart[]);
    }, [cartItems, formData]);

    return (
        <CartContainer>
            <h1>장바구니</h1>
            <>
                <form ref={formRef} onChange={handleCheckboxChanged}>
                    <label>
                        <input className="select-all" name="select-all" type="checkbox" />
                        전체 선택
                    </label>
                    <LinkColorButton to={'/payment'}>결제</LinkColorButton>
                    {cartItems.map((item, index) => (
                        <CartItem {...item} key={index} ref={checkboxRefs[index]} />
                    ))}
                </form>
                <WillPay />
            </>
        </CartContainer>
    );
}
