import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useGetPostQuery, useGetPostsQuery } from '../../generated';

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      title
      content
      slug
      createdAt
    }
  }
`;

const DashboardTop = () => {
  const router = useRouter();
  const {loading, error, data} = useGetPostsQuery();

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    console.error(error);
    return <p>Error: </p>
  }

  if (!data) {
    return <p>データが取得できませんでした</p>
  }

  if (data.getPosts === null) {
    return <p>投稿がありません</p>;
  }

  return (
    <table>
      <tbody>
        {data.getPosts.map((getPost) => {
          if (!getPost) {
            return null;
          }
          const {id, title, content, createdAt: createdAtRaw, slug} = getPost
          const createdAtObj = new Date(Number(createdAtRaw));
          const createdAt = `${createdAtObj.getFullYear()}.${createdAtObj.getMonth()}.${createdAtObj.getDay()}`;

        return (
          <tr key={id} onClick={() => router.push(`/dashboard/article/${slug}`)}>
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

export default DashboardTop;