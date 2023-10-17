import { useRecoilValue } from 'recoil';
import { checkedCartState } from '../../recoil/cart';
import lodash from 'lodash';

export default function WillPay() {
    const checkedItems = useRecoilValue(checkedCartState);
    const totalPrice = lodash.sum(checkedItems.map(({ amount, product: { price } }) => price * amount));

    return (
        <div>
            <h1>최종금액: $ {totalPrice}</h1>
        </div>
    );
}
