import { Header } from '../../components/front/Header';
import { gql } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../index';
import { prisma } from '../../libs/prisma';
import { client } from '../_app';
import { create } from 'domain';

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

const Article = ({ data }) => {
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

export async function getStaticPaths() {
  const {data} = await client.query({query: GET_POSTS});
  const paths = data.getPosts.map((post) => ({
    params: {articleSlug: post.slug}
  }))
  return { paths, fallback: false };
}

export async function getStaticProps({ params }){
  const slug = params.articleSlug;
  const {loading: fetchLoad, error: fetchError, data} = await client.query({query: GET_POST, variables: {slug}});
  
  return {
    props: {
      data,
    },
  };
};