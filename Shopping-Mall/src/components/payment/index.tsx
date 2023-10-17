import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../recoil/cart';
import WillPay from '../cart/willPay';
import PaymentItem from './item';
import { PaymentWillPayContainer, ShowModalButton } from '../../styles/styles';
import PaymentModal from './modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { graphqlFetcher } from '../../utils/queryClient';
import { EXECUTE_PAY } from '../../graphql/payment';
import { Paymentinfos } from '../../types/types';

export default function Payment() {
    const navigate = useNavigate();
    const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
    const [show, setShow] = useState(false);
    const { mutate: executePay } = useMutation((payInfo: Paymentinfos) => graphqlFetcher(EXECUTE_PAY, { payInfo }));

    function showModal() {
        setShow(true);
    }

    function proceed() {
        const payInfos = checkedCartData.map((item) => {
            const { id } = item;
            return {
                id,
            };
        });
        executePay(payInfos);
        setCheckedCartData([]);
        alert('결제가 완료되었습니다.');
        navigate('/products', { replace: true });
    }

    function cancel() {
        setShow(false);
    }

    return (
        <div>
            {checkedCartData.map((cartItem, index) => {
                return <PaymentItem {...cartItem} index={index} key={index} />;
            })}
            <PaymentWillPayContainer>
                <WillPay />
                <ShowModalButton onClick={showModal}>결제하기</ShowModalButton>
            </PaymentWillPayContainer>
            <PaymentModal show={show} proceed={proceed} cancel={cancel} />
        </div>
    );
}
