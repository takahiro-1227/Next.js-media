import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useGetPostQuery, useGetPostsQuery } from "../../generated";
import { useAuth0 } from "@auth0/auth0-react";

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
  const { loading: getPostsLoading, error: getPostsError , data } = useGetPostsQuery();
  const { user, isAuthenticated, isLoading: authLoading, error: authError, getIdTokenClaims } = useAuth0();

  if (getPostsLoading || authLoading) {
    return <p>Loading...</p>;
  }
  if (getPostsError) {
    throw getPostsError;
  }
  if (authError) {
    throw authError;
  }
  
  if (!isAuthenticated) {
    router.push("/dashboard/login");
    return <p>Redirecting...</p>
  }

  if (!data) {
    return <p>データが取得できませんでした</p>;
  }


  if (data.getPosts === null) {
    return <p>投稿がありません</p>;
  }

  const tokenId = getIdTokenClaims();
  console.log(tokenId);
  return (
    <>
      {/* <p>{tokenId}</p> */}
      {user ? <p>{user.name}</p> : null}
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
