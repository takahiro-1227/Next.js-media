import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useGetPostsQuery } from "../generated";

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

const Articles = () => {
  const { loading, error, data } = useGetPostsQuery();

  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>エラーが発生しました</p>;
  }
  if (!data) {
    return <p>データが取得できませんでした</p>;
  }

  return (
    <table>
      <tbody>
        {data.getPosts.map((getPost) => {
          if (!getPost) {
            return null;
          }
          const { id, title, content, createdAt: createdAtRaw, slug } = getPost;
          const createdAtObj = new Date(Number(createdAtRaw));
          const createdAt = `${createdAtObj.getFullYear()}.${createdAtObj.getMonth()}.${createdAtObj.getDay()}`;

          return (
            <tr key={id} onClick={() => router.push(`articles/${slug}`)}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{content}</td>
              <td>{createdAt}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Articles;
