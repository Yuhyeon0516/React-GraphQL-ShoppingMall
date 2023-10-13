import gql from 'graphql-tag';

export const GET_CART = gql`
    query GET_CART {
        id
        imageUrl
        price
        title
        ammount
    }
`;

export const ADD_CART = gql`
    mutation ADD_CART($id: string) {
        id
        imageUrl
        price
        title
        ammount
    }
`;

export const UPDATE_CART = gql`
    mutation UPDATE_CART($id: string, $ammount: number) {
        id
        imageUrl
        price
        title
        ammount
    }
`;

export const DELETE_CART = gql`
    mutation DELETE_CART($id: string) {
        id
        imageUrl
        price
        title
        ammount
    }
`;
