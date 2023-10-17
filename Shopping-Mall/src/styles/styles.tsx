import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Common

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    display: flex;
    flex: 1;
    flex-direction: column;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

// Product List Page

export const ProductListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 15px;

    @media screen and (max-width: 1400px) {
        grid-template-columns: repeat(2, auto);
    }

    @media screen and (max-width: 900px) {
        grid-template-columns: repeat(1, auto);
    }
`;

export const ProductItemContainer = styled.div`
    border: 3px solid #65ceb0;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 10px;
    position: relative;
`;

export const ProductItemImage = styled.img`
    width: 90%;
    align-self: center;
    border-radius: 20px;
    overflow: hidden;
`;

export const ProductItemTextContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 5px;
    margin-top: 20px;
    margin-left: 20px;
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
`;

export const FloatingButton = styled.button`
    background-color: #65ceb0;
    border-radius: 100px;
    border-width: 0px;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 60px;
    height: 60px;
    right: 20px;
    bottom: 20px;
    cursor: pointer;
`;

export const AddCartButtonIcon = styled(FontAwesomeIcon)`
    color: #65ceb0;
    position: absolute;
    width: 50px;
    height: 50px;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
`;

// Product Detail Page

export const ProductDetailContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    padding: 10px;
    box-sizing: border-box;
    margin: 0;
`;

export const ProductDetailImage = styled.img`
    border-radius: 20px;
    overflow: hidden;
    height: 90vh;
    align-self: center;
    flex: 1;
`;

export const ProductDetailTextContainer = styled.div`
    flex: 1;
    height: 90vh;
    align-self: center;
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    justify-content: center;
`;

export const ProductDetailTextType = styled.h1`
    margin: 0;
`;

export const ProductDetailText = styled.span`
    font-size: 20px;
    margin-top: 10px;
    width: 70%;
    margin-bottom: 60px;
`;

// Cart

export const CartContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 15px;
`;

export const CartItemContainer = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    width: 55vw;
    flex-direction: row;
    border: 3px solid #65ceb0;
    border-radius: 20px;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 15px;
`;

export const CartItemImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 20px;
`;

export const CartItemTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    gap: 10px;
`;

export const CartItemType = styled.div`
    font-size: 24px;
    font-weight: bold;
`;

export const CartItemRemoveIcon = styled(FontAwesomeIcon)`
    color: red;
    margin: 20px;
    align-self: center;
    width: 30px;
    height: 30px;
`;

export const LinkColorButton = styled(Link)`
    background-color: #65ceb0;

    text-decoration: none;
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 15px;
    margin-left: 15px;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

// payment

export const PaymentWillPayContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-left: 20px;
    align-items: center;
    gap: 20px;
`;

export const ShowModalButton = styled.button`
    background-color: #65ceb0;
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 15px;
    margin-left: 15px;
    cursor: pointer;
`;

// admin

export const IconButton = styled(FontAwesomeIcon)`
    width: 50px;
    height: 50px;
    cursor: pointer;
`;
