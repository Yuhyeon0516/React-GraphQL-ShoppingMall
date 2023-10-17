import { gql } from 'apollo-server-express';

const cartSchema = gql`
    type CartItem {
        id: ID!
        imageUrl: String!
        price: Int!
        title: String!
        amount: Int!
    }

    type Query {
        cart: [CartItem!]
    }

    type Mutation {
        addCart(id: ID!): CartItem!
        updateCart(id: ID!, amount: Int!): CartItem!
        deleteCart(id: ID!): CartItem!
        executePay(ids: [ID!]): [ID!]
    }
`;
