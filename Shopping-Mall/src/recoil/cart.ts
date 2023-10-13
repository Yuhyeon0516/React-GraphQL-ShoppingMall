import { atom } from 'recoil';
import { Cart } from '../types/types';

export const checkedCartState = atom<Cart[]>({
    key: 'cartState',
    default: [],
});
