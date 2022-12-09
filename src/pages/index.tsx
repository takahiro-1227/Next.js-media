import { gql } from "@apollo/client";
import { GetPostsQuery } from "../generated";
import { PageWithHeader } from "../components/front/PageWithHeader";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import client from "../libs/client";
import { GetStaticProps } from "next";
import Link from "next/link";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      title
      content
      slug
      createdAt
      thumbnail {
        name
      }
    }
  }
`;

const useStyles = makeStyles({
  cardWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "1000px",
    margin: "0 auto",
    gap: "14px 5%",
  },
});

interface Props {
  data: GetPostsQuery;
}

const Articles = ({ data }: Props) => {
  const classes = useStyles();

  if (!data) {
    return <p>データが取得できませんでした</p>;
  }

  return (
    <PageWithHeader>
      <div className={classes.cardWrapper}>
        {data.getPosts.map((getPost) => {
          if (!getPost) {
            return <Typography>まだ記事がありません</Typography>;
          }
          const {
            id,
            title,
            createdAt: createdAtRaw,
            slug,
            thumbnail,
          } = getPost;
          const createdAtObj = new Date(Number(createdAtRaw));
          const createdAt = `${createdAtObj.getFullYear()}.${createdAtObj.getMonth()}.${createdAtObj.getDay()}`;

          return (
            <Link href={`articles/${slug}`} key={id} passHref>
              <Card
                sx={{
                  width: "47.5%",
                  "@media(min-width: 600px)": { width: "30%" },
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    thumbnail
                      ? `${process.env.NEXT_PUBLIC_OBJECT_HOST}/${thumbnail.name}`
                      : "/egg.jpeg"
                  }
                  alt={title}
                />
                <CardContent>
                  <Typography>{createdAt}</Typography>
                  <Typography>{title}</Typography>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </PageWithHeader>
  );
};

export default Articles;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<GetPostsQuery>({
    query: GET_POSTS,
  });

  return {
    props: {
      data,
    },
  };
};
