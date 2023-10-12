import moment from 'moment';
import {
    CartButtonIcon,
    ProdcutItemText,
    ProductItemColumn,
    ProductItemContainer,
    ProductItemImage,
    ProductItemTextContainer,
    ProductItemTextType,
    StyledLink,
} from '../../styles/styles';
import { Product } from '../../types/types';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { cartSelector } from '../../recoil/cart';
import { useCallback } from 'react';

export default function ProductItem({ id, title, price, imageUrl, createdAt }: Product) {
    const [cartAmmount, setCartAmmount] = useRecoilState(cartSelector(id));

    const addToCart = useCallback(() => setCartAmmount((cartAmmount || 0) + 1), [cartAmmount, setCartAmmount]);

    return (
        <ProductItemContainer>
            <StyledLink to={`/products/${id}`}>
                <ProductItemImage src={imageUrl} alt="image" />
                <ProductItemTextContainer>
                    <ProductItemColumn>
                        <ProductItemTextType>Product Name :</ProductItemTextType>&emsp;
                        <ProdcutItemText>{title}</ProdcutItemText>
                    </ProductItemColumn>

                    <ProductItemColumn>
                        <ProductItemTextType>Price :</ProductItemTextType>&emsp;
                        <ProdcutItemText>$ {price}</ProdcutItemText>
                    </ProductItemColumn>

                    <ProductItemColumn>
                        <ProductItemTextType>Create :</ProductItemTextType>&emsp;
                        <ProdcutItemText>{moment(createdAt).format('YYYY/MM/DD hh:mm:ss').toString()}</ProdcutItemText>
                    </ProductItemColumn>
                </ProductItemTextContainer>
            </StyledLink>
            <CartButtonIcon icon={faCartShopping} onClick={addToCart} />
            <span>{cartAmmount || 0}</span>
        </ProductItemContainer>
    );
}
