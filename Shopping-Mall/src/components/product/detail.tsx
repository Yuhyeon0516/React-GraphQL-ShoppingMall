import moment from 'moment';
import { ProductDetailContainer, ProductDetailImage, ProductDetailText, ProductDetailTextContainer, ProductDetailTextType } from '../../styles/styles';
import { Product } from '../../types/types';

export default function ProductDetailItem({ data }: { data: Product }) {
    const { imageUrl, description, title, createdAt, price } = data;

    return (
        <ProductDetailContainer>
            <ProductDetailImage src={imageUrl} alt="image" />
            <ProductDetailTextContainer>
                <ProductDetailTextType>Product Name</ProductDetailTextType>
                <ProductDetailText>{title}</ProductDetailText>
                <ProductDetailTextType>Product Information</ProductDetailTextType>
                <ProductDetailText>{description}</ProductDetailText>
                <ProductDetailTextType>Price</ProductDetailTextType>
                <ProductDetailText>$ {price}</ProductDetailText>
                <ProductDetailTextType>Create</ProductDetailTextType>
                <ProductDetailText>{moment(createdAt).format('YYYY/MM/DD hh:mm:ss').toString()}</ProductDetailText>
            </ProductDetailTextContainer>
        </ProductDetailContainer>
    );
}
