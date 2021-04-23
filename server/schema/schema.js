/* eslint-disable no-use-before-define */
const graphql = require('graphql');

const { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

// dummydata

const books = [
  { name: 'Name 1', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'Name 2', genre: 'Fantasy', id: '2', authorId: '3' },
  { name: 'Name 3', genre: 'Sci-Fi', id: '3', authorId: '2' },
  { name: 'Name 4', genre: 'Fantasy', id: '4', authorId: '2' },
  { name: 'Name 5', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'Name 6', genre: 'Sci-Fi', id: '6', authorId: '3' },
];

const authors = [
  { name: 'Author 1', age: 44, id: '1' },
  { name: 'Author 2', age: 60, id: '2' },
  { name: 'Author 3', age: 23, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // code to get data from db / other source
        return authors.find((author) => author.id === parent.id);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // code to get data from db / other source
        return books.filter((book) => book.authorId === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return books.find((book) => book.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return authors.find((author) => author.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // code to get data from db / other source
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // code to get data from db / other source
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
