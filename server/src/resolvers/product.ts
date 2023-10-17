import { v4 } from 'uuid';
import { Product, Products, Resolver } from './types';
import { DBField, writeDB } from '../dbController';

function setJson(data: Products) {
    writeDB(DBField.PRODUCTS, data);
}

const productResolver: Resolver = {
    Query: {
        products: (parent, { cursor = '' }, { db }) => {
            const fromnIndex = db.products.findIndex((product) => product.id === cursor) + 1;

            return db.products.splice(fromnIndex, fromnIndex + 15) || [];
        },
        product: (parent, { id }, { db }) => {
            const found = db.products.find((item) => item.id === id);
            if (found) return found;
            return null;
        },
    },
    Mutation: {
        addProduct: (parent, { imageUrl, price, title, description }, { db }) => {
            const newProduct: Product = {
                id: v4(),
                price,
                title,
                description,
                imageUrl,
                createdAt: Date.now(),
            };
            db.products.push(newProduct);
            setJson(db.products);

            return newProduct;
        },
        updateProduct: (parent, { id, ...data }, { db }) => {
            const existProductIndex = db.products.findIndex((item) => item.id === id);

            if (existProductIndex < 0) throw new Error('없는 상품입니다.');
            const updatedItem = {
                ...db.products[existProductIndex],
                ...data,
            };
            db.products.splice(existProductIndex, 1, updatedItem);
            setJson(db.products);

            return updatedItem;
        },
        deleteProduct: (parent, { id }, { db }) => {
            const existProductIndex = db.products.findIndex((item) => item.id === id);

            if (existProductIndex < 0) throw new Error('없는 상품입니다.');
            const updatedItem = {
                ...db.products[existProductIndex],
            };

            delete updatedItem.createdAt;
            db.products.splice(existProductIndex, 1, updatedItem);
            setJson(db.products);
            return id;
        },
    },
};

export default productResolver;
