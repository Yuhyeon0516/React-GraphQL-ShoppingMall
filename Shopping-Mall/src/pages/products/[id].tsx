import { QueryKeys, fetcher } from '../../utils/queryClient';
import { ProductItemType } from '../../types/types';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDetailItem from '../../components/product/detail';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { data } = useQuery<ProductItemType>([QueryKeys.PRODUCTS, id], () => fetcher({ method: 'GET', path: `/products/${id}` }));

    if (!data) return null;

    return <ProductDetailItem data={data} />;
}
