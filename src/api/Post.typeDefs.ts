import gql from "graphql-tag";

const typeDefs = gql`
  type Item {
    id: Int!
    name: String!
    alt: String
    width: Int
    height: Int
    createdAt: String!
  }

  type Post {
    id: Int!
    slug: String!
    title: String!
    content: String!
    createdAt: String!
    thumbnail: Item
  }

  type Query {
    getPosts: [Post]!
    getPost(slug: String!): Post!
  }

  type Mutation {
    createPost(
      slug: String!
      title: String!
      content: String!
      thumbnailURL: String
    ): Post!
    updatePost(
      id: Int!
      slug: String!
      title: String!
      content: String!
      thumbnailURL: String
    ): Post!
    createItem(
      name: String!
      path: String!
      alt: String
      width: Int
      height: Int
    ): Item!
  }
`;

export default typeDefs;
