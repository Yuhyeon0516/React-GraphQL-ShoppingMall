import { graphql } from 'msw';
import { GET_PRODUCT, GET_PRODUCTS } from '../graphql/products';
import { v4 } from 'uuid';
import { Product } from '../types/types';

const mockProducts: Product[] = Array.from({ length: 20 }).map((_, index) => ({
    id: v4(),
    imageUrl: `https://loremflickr.com/300/300/${index + 1}`,
    price: 5000,
    title: `임시 상품 ${index + 1}`,
    description: `임시 상세 내용 ${index + 1}`,
    createdAt: new Date(1697096204492 + index * 1000 * 60 * 60 * 24).toString(),
}));

export const handlers = [
    graphql.query(GET_PRODUCTS, (_, res, ctx) => {
        return res(
            ctx.data({
                products: mockProducts,
            }),
        );
    }),

    graphql.query(GET_PRODUCT, (_, res, ctx) => {
        return res(ctx.data(mockProducts[0]));
    }),
];
