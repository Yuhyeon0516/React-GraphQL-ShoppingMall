import moment from 'moment';
import {
    IconButton,
    ProdcutItemText,
    ProductItemColumn,
    ProductItemContainer,
    ProductItemImage,
    ProductItemTextContainer,
    ProductItemTextType,
    StyledLink,
} from '../../styles/styles';
import { Product } from '../../types/types';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function AdminItem({ id, title, price, imageUrl, createdAt }: Product) {
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
                        <ProdcutItemText>₩ {price}</ProdcutItemText>
                    </ProductItemColumn>

                    <ProductItemColumn>
                        <ProductItemTextType>Create :</ProductItemTextType>&emsp;
                        <ProdcutItemText>{moment(createdAt).format('YYYY/MM/DD hh:mm:ss').toString()}</ProdcutItemText>
                    </ProductItemColumn>
                </ProductItemTextContainer>
            </StyledLink>
            <div style={{ gap: 20, position: 'absolute', right: 10, bottom: 10, display: 'flex' }}>
                <IconButton icon={faPencil} onClick={() => {}} color="#74a7fe" />
                <IconButton icon={faTrash} onClick={() => {}} color="#ff8c82" />
            </div>
        </ProductItemContainer>
    );
}
