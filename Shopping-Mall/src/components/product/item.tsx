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
import { useMutation } from 'react-query';
import { graphqlFetcher } from '../../utils/queryClient';
import { ADD_CART } from '../../graphql/cart';

export default function ProductItem({ id, title, price, imageUrl, createdAt }: Product) {
    const { mutate: addCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }));
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
            <CartButtonIcon icon={faCartShopping} onClick={() => addCart(id)} />
        </ProductItemContainer>
    );
}
