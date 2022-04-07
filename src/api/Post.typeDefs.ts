import gql from "graphql-tag";

const typeDefs = gql`
  type Post {
    id: Int!
    slug: String!
    title: String!
    content: String!
    createdAt: String!
  }

  type Query {
    getPosts: [Post]!
    getPost(slug: String!): Post!
  }

  type Mutation {
    createPost(slug: String!, title: String!, content: String!): Post!
    updatePost(id: Int!, slug: String!, title: String!, content: String!): Post!
  }
`;

export default typeDefs;
