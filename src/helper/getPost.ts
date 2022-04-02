import gql from 'graphql-tag';

const GET_POST = gql`
  query GetPost($slug: String!) {
    getPost(slug: $slug) {
      id
      title
      content
      createdAt
    }
  }
`;

export default GET_POST;