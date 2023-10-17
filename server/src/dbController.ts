import { resolve } from 'path';
import fs from 'fs';

export enum DBField {
    CART = 'cart',
    PRODUCTS = 'products',
}

const basePath = resolve();

const filenames = {
    [DBField.CART]: resolve(basePath, 'src/db/cart.json'),
    [DBField.PRODUCTS]: resolve(basePath, 'src/db/products.json'),
};

export function readDB(target: DBField) {
    try {
        return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'));
    } catch (error) {
        console.log(error);
    }
}

export function writeDB(target: DBField, data: any) {
    try {
        fs.writeFileSync(filenames[target], JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}
