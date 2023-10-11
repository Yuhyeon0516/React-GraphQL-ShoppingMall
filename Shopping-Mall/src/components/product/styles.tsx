import styled from 'styled-components';

export const ProductListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;

    @media screen and (max-width: 1400px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 900px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

export const ProductItemContainer = styled.div`
    border: 3px solid #65ceb0;
    border-radius: 20px;
    display: flex;
    flex: 1;
    flex-direction: row;
    padding: 10px;
`;

export const ProductItemImage = styled.img`
    height: 200px;
    border-radius: 20px;
    overflow: hidden;
`;

export const ProductItemTextContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 5px;
    margin-left: 10px;
`;

export const ProductItemColumn = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
`;

export const ProductItemTextType = styled.h4`
    margin: 0;
    font-size: 20px;
`;

export const ProdcutItemText = styled.p`
    margin: 0;
    font-size: 16px;
    flex: 1;
`;
