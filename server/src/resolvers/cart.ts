import { DocumentData, addDoc, collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from 'firebase/firestore';
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
        addCart: async (parent, { id }) => {
            if (!id) throw Error('상품 아이디가 없습니다.');
            const productRef = doc(db, 'products', id);
            const cartCollection = collection(db, 'cart');
            const exist = (await getDocs(query(cartCollection, where('product', '==', productRef)))).docs[0];

            let cartRef;
            if (exist) {
                cartRef = doc(db, 'cart', exist.id);
                await updateDoc(cartRef, {
                    amount: increment(1),
                });
            } else {
                cartRef = await addDoc(cartCollection, {
                    amount: 1,
                    product: productRef,
                });
            }

            const snapshot = await getDoc(cartRef);
            const data = snapshot.data() as any;

            console.log({
                id: snapshot.id,
                ...data,
            });

            return {
                id: snapshot.id,
                ...data,
            };
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
            const product = await getDoc(cartItem.product);
            const data = product.data() as any;

            return {
                ...data,
                id: product.id,
            };
        },
    },
};

export default cartResolver;
