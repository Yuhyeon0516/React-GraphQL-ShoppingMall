import { graphql } from 'msw';
import { GET_PRODUCT, GET_PRODUCTS } from '../graphql/products';
import { Cart, Product } from '../types/types';
import { ADD_CART, GET_CART, UPDATE_CART } from '../graphql/cart';

const mockProducts: Product[] = (() =>
    Array.from({ length: 20 }).map((_, index) => ({
        id: index + 1 + '',
        imageUrl: `https://loremflickr.com/300/300/${index + 1}`,
        price: 5000,
        title: `임시 상품 ${index + 1}`,
        description: `임시 상세 내용 ${index + 1}`,
        createdAt: new Date(1697096204492 + index * 1000 * 60 * 60 * 24).toString(),
    })))();

let mockCart: { [key: string]: Cart } = {};

export const handlers = [
    graphql.query(GET_PRODUCTS, (_, res, ctx) => {
        return res(
            ctx.data({
                products: mockProducts,
            }),
        );
    }),

    graphql.query(GET_PRODUCT, (req, res, ctx) => {
        const found = mockProducts.find((item) => item.id === req.variables.id);
        if (found) return res(ctx.data(found));
        return res();
    }),

    graphql.query(GET_CART, (_, res, ctx) => {
        return res(ctx.data(mockCart));
    }),

    graphql.mutation(ADD_CART, (req, res, ctx) => {
        const newData = { ...mockCart };
        const id = req.variables.id;

        if (newData[id]) {
            newData[id] = {
                ...newData[id],
                amount: (newData[id].amount || 0) + 1,
            };
        } else {
            const found = mockProducts.find((item) => item.id === req.variables.id);
            if (found) {
                newData[id] = {
                    ...found,
                    amount: 1,
                };
            }
        }
        mockCart = newData;
        return res(ctx.data(newData));
    }),

    graphql.mutation(UPDATE_CART, (req, res, ctx) => {
        const newData = { ...mockCart };
        const { id, amount } = req.variables;

        if (!newData[id]) throw new Error('없는 데이터입니다.');

        newData[id] = {
            ...newData[id],
            amount: amount,
        };
        mockCart = newData;
        return res(ctx.data(newData));
    }),
];
