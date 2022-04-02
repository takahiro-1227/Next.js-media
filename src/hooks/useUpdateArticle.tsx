import { gql, useMutation, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import GET_POST from '../helper/getPost'; 

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