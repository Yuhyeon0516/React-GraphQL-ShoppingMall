import { CartItemContainer, CartItemImage, CartItemTextContainer, CartItemType } from '../../styles/styles';
import { Cart } from '../../types/types';

export default function PaymentItem({ title, price, amount, imageUrl, index }: Cart & { index: number }) {
    return (
        <CartItemContainer>
            <div style={{ marginLeft: 20 }}>{index + 1}</div>
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
                <div>{amount}</div>
            </CartItemTextContainer>

            <CartItemTextContainer>
                <CartItemType>합계</CartItemType>
                <div>$ {price * amount}</div>
            </CartItemTextContainer>
        </CartItemContainer>
    );
}
