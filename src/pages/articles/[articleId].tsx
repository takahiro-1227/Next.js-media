import { Header } from '../../components/front/Header';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../libs/client';
const Article = ({ data }) => {
  return (
    <>
    <Header/>
    <main className="pt-14">
      <article className="mt-6 px-4 leading-8">
        <div className="max-w-3xl mx-auto">
          <div>
            <time dateTime="2022-02-01">2022/02/01</time>
            <h1 className="ttl1-size">{data.title}</h1>
            <ul>
              <li>
                <Link href="/">退職</Link>
              </li>
            </ul>
          </div>
          <div className="my-[40px] z-1" >
            <Image className="z-1" src="/moetsuki.png" alt="サムネ" width="500" height="100" layout="responsive" objectFit="contain"/>
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{__html: data.content}}>
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


export async function getStaticPaths() {
  const posts = await client.get({
    endpoint: 'articles',
  })
  console.log(posts);
  const paths = posts.contents.map((post) => ({
    params: {articleId: post.id}
  }))
  return { paths, fallback: false };
}

export async function getStaticProps({params}){
  const post_id = params.articleId;
  const data = await client.get({
    endpoint: `articles/${post_id}`,
  });
  
  return {
    props: {
      data,
    },
  };
};