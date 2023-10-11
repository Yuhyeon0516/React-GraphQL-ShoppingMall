import { useQuery } from 'react-query';
import { QueryKeys, fetcher } from '../../utils/queryClient';
import { ProductItemType } from '../../types/types';

export default function ProductList() {
    const { data } = useQuery<ProductItemType[]>(QueryKeys.PRODUCTS, () => fetcher({ method: 'GET', path: '/products' }));

    /*
    id: 58
    title: "Practical Granite Car"
    price: 240
    description: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals"
    ▶ images 3 Array
        0: "https://i.imgur.com/DumuKkD.jpeg"
        1: "https://i.imgur.com/OARGZQW.jpeg"
        2: "https://i.imgur.com/x0K3SKA.jpeg"
    creationAt: "2023-10-11T03:24:10.000Z"
    updatedAt: "2023-10-11T11:42:22.000Z"
    ▶ category 5 Object
        id: 4
        name: "Shoes"
        image: "https://i.imgur.com/x0K3SKA.jpeg"
        creationAt: "2023-10-11T03:24:10.000Z"
        updatedAt: "2023-10-11T03:24:10.000Z"
    */

    return <div>ProductList</div>;
}
