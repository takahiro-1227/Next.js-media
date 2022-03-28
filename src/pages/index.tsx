import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query {
    getPosts {
      id
      title
      content
      slug
      createdAt
    }
  }
`;

const Articles = () => {
  const {loading, error, data} = useQuery(GET_POSTS);
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    console.error(error);
    return <p>Error: </p>
  }
  return (
    <table>
      <tbody>
        {data.getPosts.map(({id, title, content, createdAt: createdAtRaw}) => {
          const createdAtObj = new Date(Number(createdAtRaw));
          const createdAt = `${createdAtObj.getFullYear()}.${createdAtObj.getMonth()}.${createdAtObj.getDay()}`;

        return (
        <tr key={id}>
          <td>{id}</td>
          <td>{title}</td>
          <td>{content}</td>
          <td>{createdAt}</td>
        </tr>
        )
        })}
      </tbody>
    </table>
  )
}

export default Articles;