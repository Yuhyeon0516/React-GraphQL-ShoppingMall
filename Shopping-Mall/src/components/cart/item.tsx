import { useMutation } from 'react-query';
import { Cart } from '../../types/types';
import { UPDATE_CART } from '../../graphql/cart';
import { QueryKeys, getClient, graphqlFetcher } from '../../utils/queryClient';
import { SyntheticEvent } from 'react';

export default function CartItem({ id, title, price, amount, imageUrl }: Cart) {
    const queryClient = getClient();
    const { mutate: updateCart } = useMutation(({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }));

    function handleUpdateAmount(e: SyntheticEvent) {
        const value = Number((e.target as HTMLInputElement).value);
        updateCart(
            { id, amount: value },
            {
                onSuccess: (newValue) => {
                    queryClient.setQueryData(QueryKeys.CART, newValue);
                },
            },
        );
    }

    return (
        <li>
            <img src={imageUrl} alt="image" />
            <p>{price}</p>
            <p>{title}</p>
            <input type="number" value={amount} onChange={handleUpdateAmount} />
        </li>
    );
}
