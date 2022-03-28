import { gql, useMutation, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

const GET_POST = gql`
  query GetPost($slug: String!) {
    getPost(slug: $slug) {
      id
      title
      content
    }
  }
`;
const UPDATE_POST = gql`
mutation UpdatePost($id: Int!, $title: String!, $content: String!, $slug: String!) {
  updatePost(id: $id, title: $title, content: $content, slug: $slug) {
    id
  }
}
`;

export const useUpdateArticle = (firstSlug: string) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState(firstSlug);

  const {loading: fetchLoad, error: fetchError, data} = useQuery(GET_POST, {
    variables: {
      slug: firstSlug
    }
  });

  useEffect(() => {
    if (!fetchLoad && data) {
      setTitle(data.getPost.title);
      setContent(data.getPost.content);
      setSlug(firstSlug);
      console.log(content);
    }
  }, [fetchLoad, data])

  useEffect(() => {
    console.log(content);
  }, [content])

  const [updatePost] = useMutation(UPDATE_POST);

  const handleChangeTitle = ({target}: React.ChangeEvent<HTMLInputElement>) => setTitle(target.value);
  const handleChangeContent = ({target}: React.ChangeEvent<HTMLInputElement>) => setContent(target.value);
  const handleChangeSlug = ({target}: React.ChangeEvent<HTMLInputElement>) => setSlug(target.value);

  const handleSave = async () => {
    await updatePost({
      variables: {
        id: data.getPost.id,
        slug,
        title,
        content
      }
    }).then(result => {
      if (!result.data) {
        throw new Error('データが返ってきません')
      }

      window.alert('記事を更新しました');
    }).catch(error => {
      window.alert('記事の更新中にエラーが発生しました。')

      console.error(error);
    })
  }

  // const [title, setTitle] = useState(data.getPost.title);
  // const [content, setContent] = useState(data.getPost.content);
  // const [slug, setSlug] = useState(firstSlug);
  
  // if(updateLoading) {
  //   return <p>update loading</p>
  // }
  // if (updateError) {
  //   return <p>update error</p>
  // }

  return {
    fetchLoad,
    fetchError,
    title,
    content,
    slug,
    handleChangeTitle,
    handleChangeContent,
    handleChangeSlug,
    handleSave
  }
}