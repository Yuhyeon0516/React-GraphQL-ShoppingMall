import { Resolver } from './types';

let cartData = [
    { id: '1', amount: 1 },
    { id: '2', amount: 2 },
];
const mockProducts = (() =>
    Array.from({ length: 20 }).map((_, index) => ({
        id: index + 1 + '',
        imageUrl: `https://loremflickr.com/300/300/${index + 1}`,
        price: 5000,
        title: `임시 상품 ${index + 1}`,
        description: `임시 상세 내용 ${index + 1}`,
        createdAt: new Date(1697096204492 + index * 1000 * 60 * 60 * 24).toString(),
    })))();

const cartResolver: Resolver = {
    Query: {
        cart: (parent, args, context, info) => {
            return cartData;
        },
    },
    Mutation: {
        addCart: (parent, { id }, context, info) => {
            const newData = { ...cartData };

            if (newData[id]) {
                newData[id] = {
                    ...newData[id],
                    amount: (newData[id].amount || 0) + 1,
                };
            } else {
                const found = mockProducts.find((item) => item.id === id);
                if (found) {
                    newData[id] = {
                        ...found,
                        amount: 1,
                    };
                }
            }
            cartData = newData;
            return newData;
        },
        updateCart: (parent, { id, amount }, context, info) => {
            const newData = { ...cartData };

            if (!newData[id]) throw new Error('없는 데이터입니다.');

            newData[id] = {
                ...newData[id],
                amount: amount,
            };
            cartData = newData;
            return newData;
        },
        deleteCart: (parent, { id }, context, info) => {
            const newData = { ...cartData };

            delete newData[id];
            cartData = newData;
            return newData;
        },
        executePay: (parent, { ids }, context, info) => {
            const newCartData = cartData.filter((cartItem) => !ids.includes(cartItem.id));

            cartData = newCartData;
            return ids;
        },
    },
};

export default cartResolver;
