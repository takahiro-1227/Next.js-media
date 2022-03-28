import { gql, useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { EditArticle } from "../../../components/dashboard/EditArticle";
import { useUpdateArticle } from '../../../hooks/useUpdateArticle';
import { useRouter } from 'next/router';

const GET_POST = gql`
  query GetPost($slug: String!) {
    getPost(slug: $slug) {
      id
      title
      content
    }
  }
`;

const UpdateArticle = () => {
  const router = useRouter();
  const firstSlug = router.query.articleSlug;

  const {
    fetchError,
    fetchLoad,
    title,
    content,
    slug,
    handleChangeTitle,
    handleChangeContent,
    handleChangeSlug,
    handleSave
  } = useUpdateArticle(firstSlug as string);

  if (fetchError) {
    return <p>fetch error</p>
  }
  if (fetchLoad) {
    return <p>fetch loading</p>
  }

  return (
    <EditArticle title={title} content={content} slug={slug} handleChangeTitle={handleChangeTitle} handleChangeContent={handleChangeContent} handleChangeSlug={handleChangeSlug} savePost={handleSave}/>
  )
}

export default UpdateArticle;