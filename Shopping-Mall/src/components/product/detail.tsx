import moment from 'moment';
import { ProductDetailContainer, ProductDetailImage, ProductDetailText, ProductDetailTextContainer, ProductDetailTextType } from '../../styles/styles';
import { ProductItemType } from '../../types/types';

export default function ProductDetailItem({ data }: { data: ProductItemType }) {
    const { category, images, description, title, creationAt, price } = data;

    return (
        <ProductDetailContainer>
            <ProductDetailImage src={images[0] ?? 'https://avatars.githubusercontent.com/u/120432007?v=4'} alt="image" />
            <ProductDetailTextContainer>
                <ProductDetailTextType>Category</ProductDetailTextType>
                <ProductDetailText>{category.name}</ProductDetailText>
                <ProductDetailTextType>Product Name</ProductDetailTextType>
                <ProductDetailText>{title}</ProductDetailText>
                <ProductDetailTextType>Product Information</ProductDetailTextType>
                <ProductDetailText>{description}</ProductDetailText>
                <ProductDetailTextType>Price</ProductDetailTextType>
                <ProductDetailText>$ {price}</ProductDetailText>
                <ProductDetailTextType>Create</ProductDetailTextType>
                <ProductDetailText>{moment(creationAt).format('YYYY/MM/DD hh:mm:ss').toString()}</ProductDetailText>
            </ProductDetailTextContainer>
        </ProductDetailContainer>
    );
}
