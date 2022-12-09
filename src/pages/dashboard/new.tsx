import { EditArticle } from "../../components/dashboard/EditArticle";
import { useUpdateArticle } from "../../hooks/useUpdateArticle";

const NewArticle = () => {
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
  } = useUpdateArticle();

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

export default NewArticle;
