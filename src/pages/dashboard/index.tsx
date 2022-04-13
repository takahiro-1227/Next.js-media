import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useGetPostsQuery } from "../../generated";
import { useUser } from "@auth0/nextjs-auth0";

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
  const {
    loading: getPostsLoading,
    error: getPostsError,
    data,
  } = useGetPostsQuery();
  const { user, isLoading: authLoading, error: authError } = useUser();

  if (getPostsLoading || authLoading) {
    return <p>Loading...</p>;
  }
  if (getPostsError) {
    throw getPostsError;
  }
  if (authError) {
    throw authError;
  }

  if (!user) {
    router.push("/dashboard/login");
    return <p>Redirecting...</p>;
  }

  if (!data) {
    return <p>データが取得できませんでした</p>;
  }

  if (data.getPosts === null) {
    return <p>投稿がありません</p>;
  }

  return (
    <>
      <p>{user.name}</p>
      <table>
        <tbody>
          {data.getPosts.map((getPost) => {
            if (!getPost) {
              return null;
            }
            const {
              id,
              title,
              content,
              createdAt: createdAtRaw,
              slug,
            } = getPost;
            const createdAtObj = new Date(Number(createdAtRaw));
            const createdAt = `${createdAtObj.getFullYear()}.${createdAtObj.getMonth()}.${createdAtObj.getDay()}`;

            return (
              <tr
                key={id}
                onClick={() => router.push(`/dashboard/article/${slug}`)}
              >
                <td>{id}</td>
                <td>{title}</td>
                <td>{content}</td>
                <td>{createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DashboardTop;
