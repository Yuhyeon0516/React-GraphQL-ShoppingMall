import { useQuery } from 'react-query';
import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import ProductItem from '../../components/product/item';
import { FloatingButton, ProductListContainer } from '../../styles/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { GET_PRODUCTS } from '../../graphql/products';
import { Products } from '../../types/types';

export default function ProductList() {
    // const { data } = useQuery<ProductItemType[]>(QueryKeys.PRODUCTS, () => fetcher({ method: 'GET', path: '/products' }));
    const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () => graphqlFetcher<Products>(GET_PRODUCTS));

    return (
        <ProductListContainer>
            {data?.products.map((product) => (
                <ProductItem {...product} key={product.id} />
            ))}
            <FloatingButton>
                <FontAwesomeIcon icon={faPlus} fontSize={18} color="white" />
            </FloatingButton>
        </ProductListContainer>
    );
}
