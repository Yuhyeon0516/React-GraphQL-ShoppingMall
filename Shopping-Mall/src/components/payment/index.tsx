import { useRecoilValue } from 'recoil';
import { checkedCartState } from '../../recoil/cart';
import WillPay from '../cart/willPay';
import PaymentItem from './item';
import { LinkColorButton, PaymentWillPayContainer } from '../../styles/styles';

export default function Payment() {
    const checkedCartData = useRecoilValue(checkedCartState);

    return (
        <div>
            {checkedCartData.map((cartItem, index) => {
                return <PaymentItem {...cartItem} index={index} />;
            })}
            <PaymentWillPayContainer>
                <WillPay />
                <LinkColorButton to={'/'}>결제</LinkColorButton>
            </PaymentWillPayContainer>
        </div>
    );
}
