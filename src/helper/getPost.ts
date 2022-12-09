import gql from "graphql-tag";

const GET_POST = gql`
  query getPost($slug: String!) {
    getPost(slug: $slug) {
      id
      title
      slug
      content
      createdAt
      thumbnail {
        name
        alt
        width
        height
      }
    }
  }
`;

export default GET_POST;
