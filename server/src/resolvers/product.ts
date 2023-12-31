import { v4 } from 'uuid';
import { Product, Products, Resolver } from './types';
import { DBField, writeDB } from '../dbController';
import { db } from '../../firebase';
import {
    DocumentData,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    startAfter,
    updateDoc,
    where,
} from 'firebase/firestore';

const PAGE_SIZE = 15;

function setJson(data: Products) {
    writeDB(DBField.PRODUCTS, data);
}

const productResolver: Resolver = {
    Query: {
        products: async (parent, { cursor = '', showDeleted = false }) => {
            const products = collection(db, 'products');
            const queryOptions: any[] = [orderBy('createdAt', 'desc')];
            if (cursor) {
                const snapshot = await getDoc(doc(db, 'products', cursor));
                queryOptions.push(startAfter(snapshot));
            }
            if (!showDeleted) queryOptions.unshift(where('createdAt', '!=', null));
            const q = query(products, ...queryOptions, limit(PAGE_SIZE));

            const snapshot = await getDocs(q);
            const data: DocumentData[] = [];
            snapshot.forEach((doc) =>
                data.push({
                    id: doc.id,
                    ...doc.data(),
                }),
            );

            return data;
        },
        product: async (parent, { id }) => {
            const snapshot = await getDoc(doc(db, 'products', id));
            return {
                ...snapshot.data(),
                id: snapshot.id,
            };
        },
    },
    Mutation: {
        addProduct: async (parent, { imageUrl, price, title, description }) => {
            const newProduct = {
                price,
                title,
                description,
                imageUrl,
                createdAt: serverTimestamp(),
            };

            const result = await addDoc(collection(db, 'products'), newProduct);
            const snapshot = await getDoc(result);

            return {
                id: snapshot.id,
                ...snapshot.data(),
            };
        },
        updateProduct: async (parent, { id, ...data }) => {
            const productRef = doc(db, 'products', id);
            if (!productRef) throw new Error('없는 상품입니다.');

            await updateDoc(productRef, data);
            const snapshot = await getDoc(productRef);
            const newData = snapshot.data() as any;

            return {
                id: snapshot.id,
                ...newData,
            };
        },
        deleteProduct: async (parent, { id }) => {
            const productRef = doc(db, 'products', id);
            if (!productRef) throw new Error('없는 상품입니다.');
            await updateDoc(productRef, { createdAt: null });

            return id;
        },
    },
};

export default productResolver;
