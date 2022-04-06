import { GetStaticPaths, GetStaticProps } from 'next';
import { Header } from '../../components/front/Header';
import { GET_POSTS } from '../index';
import client from '../../libs/client';
import GET_POST from '../../helper/getPost';
import { GetPostQuery, GetPostsQuery } from '../../generated';

interface Props {
  data: GetPostQuery
}

const Article = ({ data }: Props) => {
  const { title, content, createdAt: createdAtRaw } = data.getPost;

  const createdAtObj = new Date(Number(createdAtRaw));
  const createdAt = `${createdAtObj.toLocaleDateString('ja-JP')}`
  return (
    <>
    <Header/>
    <main className="pt-14">
      <article className="mt-6 px-4 leading-8">
        <div className="max-w-3xl mx-auto">
          <div>
            <p>{createdAt}</p>
            <h1 className="ttl1-size">{title}</h1>
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{__html: content}}>
          </div>
        </div>
      </article>
    </main>
    <style jsx>{`
    .post-content h2 {
      font-weight: bold;
    }
    `}</style>
    </>
  )
}
export default Article;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query<GetPostsQuery>({query: GET_POSTS});
  const paths = data.getPosts.map((post) => ({
    params: {articleSlug: post?.slug}
  }))
  return { paths, fallback: "blocking" };
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  if (!params) {
    return { props: {data: null} }
  }

  const slug = params.articleSlug;
  const {data} = await client.query<GetPostQuery>({query: GET_POST, variables: {slug}});
  
  return {
    props: {
      data,
    },
  };
};