import { TextField, Button, Input } from "@mui/material";
import { FunctionComponent, ChangeEventHandler } from "react";

interface Props {
  title: string;
  content: string;
  slug: string;
  thumbnailURL: string;
  handleChangeTitle: ChangeEventHandler;
  handleChangeContent: ChangeEventHandler;
  handleChangeSlug: ChangeEventHandler;
  handleUploadPreview: ChangeEventHandler<HTMLInputElement>;
  savePost: () => void;
}

export const EditArticle: FunctionComponent<Props> = ({
  title,
  content,
  slug,
  thumbnailURL,
  handleChangeTitle,
  handleChangeContent,
  handleChangeSlug,
  handleUploadPreview,
  savePost,
}) => {
  return (
    <>
      <TextField label="タイトル" value={title} onChange={handleChangeTitle} />
      <TextField
        label="本文"
        value={content}
        fullWidth={true}
        multiline={true}
        rows="7"
        onChange={handleChangeContent}
      />
      <TextField label="スラッグ" value={slug} onChange={handleChangeSlug} />
      <Input type="file" onChange={handleUploadPreview} />
      {thumbnailURL && <img src={thumbnailURL} width="40" height="40" />}
      <Button color="primary" onClick={() => savePost()}>
        保存
      </Button>
    </>
  );
};
