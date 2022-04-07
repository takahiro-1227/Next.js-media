import { TextField, Button } from "@mui/material";
import {
  FunctionComponent,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";

interface Props {
  title: string;
  content: string;
  slug: string;
  handleChangeTitle: ChangeEventHandler;
  handleChangeContent: ChangeEventHandler;
  handleChangeSlug: ChangeEventHandler;
  savePost: (event: void) => void;
}

export const EditArticle: FunctionComponent<Props> = ({
  title,
  content,
  slug,
  handleChangeTitle,
  handleChangeContent,
  handleChangeSlug,
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
      <Button color="primary" onClick={() => savePost()}>
        保存
      </Button>
    </>
  );
};
