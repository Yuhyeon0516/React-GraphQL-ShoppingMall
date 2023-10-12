import { QueryKeys, graphqlFetcher } from '../../utils/queryClient';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDetailItem from '../../components/product/detail';
import { Product } from '../../types/types';
import { GET_PRODUCT } from '../../graphql/products';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () => graphqlFetcher<Product>(GET_PRODUCT));

    if (!data) return null;

    return <ProductDetailItem data={data} />;
}
