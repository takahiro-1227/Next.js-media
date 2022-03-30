import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export const GET_POSTS = gql`
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

  const router = useRouter();
  
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
        {data.getPosts.map(({id, title, content, createdAt: createdAtRaw, slug}) => {
          const createdAtObj = new Date(Number(createdAtRaw));
          const createdAt = `${createdAtObj.getFullYear()}.${createdAtObj.getMonth()}.${createdAtObj.getDay()}`;

        return (
        <tr key={id} onClick={() => router.push(`articles/${slug}`)}>
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