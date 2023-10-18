import { DocumentData, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { DBField, writeDB } from '../dbController';
import { Cart, CartItem, Resolver } from './types';
import { db } from '../../firebase';

function setJson(data: Cart) {
    writeDB(DBField.CART, data);
}

const cartResolver: Resolver = {
    Query: {
        cart: async (parent, args) => {
            const cart = collection(db, 'cart');
            const snapshot = await getDocs(cart);
            const data: DocumentData[] = [];
            snapshot.forEach((doc) =>
                data.push({
                    id: doc.id,
                    ...doc.data(),
                }),
            );

            return data;
        },
    },
    Mutation: {
        addCart: (parent, { id }, { db }) => {
            if (!id) throw Error('상품 아이디가 없습니다.');
            const targetProduct = db.products.find((item) => item.id === id);
            if (!targetProduct) throw Error('상품이 없습니다.');

            const existCartIndex = db.cart.findIndex((item) => item.id === id);

            if (existCartIndex > -1) {
                const newCartItem: CartItem = {
                    id,
                    amount: db.cart[existCartIndex].amount + 1,
                };
                db.cart.splice(existCartIndex, 1, newCartItem);
                setJson(db.cart);
                return newCartItem;
            }

            const newItem: CartItem = {
                id,
                amount: 1,
            };

            db.cart.push(newItem);
            setJson(db.cart);
            return newItem;
        },
        updateCart: (parent, { id, amount }, { db }) => {
            const existCartIndex = db.cart.findIndex((item) => item.id === id);

            if (existCartIndex < 0) throw new Error('없는 데이터입니다.');

            const newCartItem: CartItem = {
                id,
                amount,
            };
            db.cart.splice(existCartIndex, 1, newCartItem);
            setJson(db.cart);
            return newCartItem;
        },
        deleteCart: (parent, { id }, { db }) => {
            const existCartIndex = db.cart.findIndex((item) => item.id === id);

            if (existCartIndex < 0) throw new Error('없는 데이터입니다.');

            db.cart.splice(existCartIndex, 1);
            setJson(db.cart);
            return id;
        },
        executePay: (parent, { ids }, { db }, info) => {
            const newCartData = db.cart.filter((cartItem) => !ids.includes(cartItem.id));

            db.cart = newCartData;
            setJson(db.cart);
            return ids;
        },
    },
    CartItem: {
        product: async (cartItem, args) => {
            const product = await getDoc(cartItem.productId);
            const data = product.data() as any;

            return {
                ...data,
                id: product.id,
            };
        },
    },
};

export default cartResolver;
