import moment from 'moment';
import {
    ProdcutItemText,
    ProductItemColumn,
    ProductItemContainer,
    ProductItemImage,
    ProductItemTextContainer,
    ProductItemTextType,
    StyledLink,
} from '../../styles/styles';
import { Product } from '../../types/types';

export default function ProductItem({ id, title, price, imageUrl, createdAt }: Product) {
    return (
        <StyledLink to={`/products/${id}`}>
            <ProductItemContainer>
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
            </ProductItemContainer>
        </StyledLink>
    );
}
