//this file will tell that what will be the structure of your data

const { default: gql } = require('graphql-tag');

//String
//Int
//Float
//Boolean
//ID -> an unique Identifier

const typeDefs = gql`

type Product {
id : ID!
title : String!
category: String!
price: Float!
isStock: Boolean!
}

type Query{
 products: [Product!]!
 product(id: ID): Product
}
 

type Mutation{
    createProduct(
        title : String!
        category: String!
        price: Float!
        isStock: Boolean!
    ): Product

    
    deleteProduct(id: ID!): Boolean


    updateProduct(
    id: ID!
    title: String
    category: String
    price: Float
    inStock: Boolean
    ): Product
}
`;

module.exports = typeDefs;

//type Query: This defines the root query type for the GraphQL schema. 
//Queries are how clients request data.

//products: [Product!]!
//products: This is the name of the query field.
//[Product!]!: This indicates that the products field returns a list of Product objects.
//The brackets [] signify that it's a list.
//The Product! means that each item in the list is a non-nullable Product type (i.e., it cannot be null).
