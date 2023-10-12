import { Cart } from '../../types/types';

export default function CartItem({ item }: { item: Cart }) {
    return (
        <li>
            {item.id} {item.title} {item.price} {item.amount}
        </li>
    );
}
