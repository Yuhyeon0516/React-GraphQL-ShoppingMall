import { createPortal } from 'react-dom';

function ModalPortal({ children }: { children: JSX.Element }) {
    return createPortal(children, document.getElementById('modal')!);
}

export default function PaymentModal({ show, proceed, cancel }: { show: boolean; proceed: () => void; cancel: () => void }) {
    return show ? (
        <ModalPortal>
            <div>
                <p>정말 결제 할까요?</p>
                <div>
                    <button onClick={proceed}>예</button>
                    <button onClick={cancel}>아니오</button>
                </div>
            </div>
        </ModalPortal>
    ) : null;
}
