import { EditArticle } from "../../../components/dashboard/EditArticle";
import { useUpdateArticle } from "../../../hooks/useUpdateArticle";
import { useRouter } from "next/router";
import { useGetPostLazyQuery } from "../../../generated";
import { useEffect } from "react";

const UpdateArticle = () => {
  const router = useRouter();
  const firstSlug = router.query.articleSlug;

  const [getPost, { error: fetchError, loading: fetchLoad, data }] =
    useGetPostLazyQuery();

  useEffect(() => {
    if (firstSlug) {
      getPost({ variables: { slug: firstSlug as string } });
    }
  }, [firstSlug]);

  const {
    title,
    content,
    slug,
    thumbnailURL,
    handleChangeTitle,
    handleChangeContent,
    handleChangeSlug,
    handleUploadPreview,
    handleSave,
  } = useUpdateArticle(data?.getPost);

  if (fetchError) {
    return <p>fetch error</p>;
  }
  if (fetchLoad) {
    return <p>fetch loading</p>;
  }

  return (
    <EditArticle
      title={title}
      content={content}
      slug={slug}
      thumbnailURL={thumbnailURL}
      handleChangeTitle={handleChangeTitle}
      handleChangeContent={handleChangeContent}
      handleChangeSlug={handleChangeSlug}
      handleUploadPreview={handleUploadPreview}
      savePost={handleSave}
    />
  );
};

export default UpdateArticle;
