import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
    query GET_PRODUCTS {
        id
        imageUrl
        price
        title
        description
        createdAt
    }
`;

export const GET_PRODUCT = gql`
    query GET_PRODUCT($id: string) {
        id
        imageUrl
        price
        title
        description
        createdAt
    }
`;
