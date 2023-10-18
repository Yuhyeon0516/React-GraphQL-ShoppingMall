import { SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import { QueryKeys, getClient, graphqlFetcher } from '../../utils/queryClient';
import { Product } from '../../types/types';
import { ADD_PRODUCT } from '../../graphql/products';
import arrToObj from '../../utils/arrToObj';

type OmitProduct = Omit<Product, 'id' | 'createdAt'>;

export default function AddForm() {
    const queryClient = getClient();
    const { mutate: addProduct } = useMutation(({ title, imageUrl, price, description }: OmitProduct) =>
        graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description }),
    );

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
        formData.price = Number(formData.price);
        await addProduct(formData as OmitProduct);
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
            exact: false,
            refetchInactive: false,
        });

        const form = document.getElementById('form') as HTMLFormElement;
        form.reset();
    }

    return (
        <form id="form" style={{ marginBottom: 20, gap: 25, display: 'flex' }} onSubmit={handleSubmit}>
            <label>
                상품명: <input name="title" type="text" />
            </label>
            <label>
                이미지URL: <input name="imageUrl" type="text" />
            </label>
            <label>
                상품가격: <input name="price" type="number" min={1000} />
            </label>
            <label>
                상품설명: <input name="description" type="text" />
            </label>
            <button type="submit">등록</button>
        </form>
    );
}
