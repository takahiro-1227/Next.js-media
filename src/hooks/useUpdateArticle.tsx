import { gql, useMutation, useQuery } from "@apollo/client";
import { useState, useEffect, ChangeEventHandler } from "react";
import { GetPostQuery } from "../generated";

export const UPDATE_POST = gql`
  mutation updatePost(
    $id: Int!
    $title: String!
    $content: String!
    $slug: String!
    $thumbnailURL: String
  ) {
    updatePost(
      id: $id
      title: $title
      content: $content
      slug: $slug
      thumbnailURL: $thumbnailURL
    ) {
      id
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $content: String!
    $slug: String!
    $thumbnailURL: String
  ) {
    createPost(
      title: $title
      content: $content
      slug: $slug
      thumbnailURL: $thumbnailURL
    ) {
      id
    }
  }
`;

export const useUpdateArticle = (data?: GetPostQuery["getPost"]) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setSlug(data.slug);
      if (data.thumbnail) {
        setThumbnailURL(
          `${process.env.NEXT_PUBLIC_OBJECT_HOST}/${data.thumbnail.name}`
        );
      }
    }
  }, [data]);

  const [updatePost] = useMutation(UPDATE_POST);

  const [createPost] = useMutation(CREATE_POST);

  const handleChangeTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(target.value);
  const handleChangeContent = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => setContent(target.value);
  const handleChangeSlug = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setSlug(target.value);

  const handleUploadPreview: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(target.files[0]);
      fileReader.onload = () => {
        const url = fileReader.result;
        if (url && typeof url === "string") {
          setThumbnailURL(fileReader.result as string);
        } else {
          alert("プレビューを表示できません。");
        }
      };
    } else {
      alert("ファイルが選択されていません。");
    }
  };

  const handleSave = async () => {
    if (!data) {
      await createPost({
        variables: {
          slug,
          title,
          content,
          thumbnailURL,
        },
      })
        .then((result) => {
          if (!result.data) {
            throw new Error("データが返ってきません");
          }

          window.alert("記事が作成されました");
        })
        .catch((error) => {
          window.alert("記事の作成中にエラーが発生しました");
          console.error(error);
        });
    } else {
      await updatePost({
        variables: {
          id: data.id,
          slug,
          title,
          content,
          thumbnailURL,
        },
      })
        .then((result) => {
          if (!result.data) {
            throw new Error("データが返ってきません");
          }

          window.alert("記事を更新しました");
        })
        .catch((error) => {
          window.alert("記事の更新中にエラーが発生しました。");

          console.error(error);
        });
    }
  };

  return {
    title,
    content,
    slug,
    thumbnailURL,
    handleChangeTitle,
    handleChangeContent,
    handleChangeSlug,
    handleUploadPreview,
    handleSave,
  };
};
