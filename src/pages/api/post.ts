import { prisma } from "../../libs/prisma";
import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import Cors from "micro-cors";
import typeDefs from "../../api/Post.typeDefs";
import { Resolvers } from "../../generated";
import { decode } from "punycode";
import { s3Client } from "../../libs/s3Client";
import {
  ListBucketsCommand,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { uploadS3Base64 } from "../../helper/uploadS3Base64";

export type Context = {
  prisma: PrismaClient;
};

export async function createContext(): Promise<Context> {
  return {
    prisma,
  };
}
export const resolvers: Resolvers = {
  Query: {
    getPosts: (_parent, _args, { prisma }) => {
      return prisma.post.findMany();
    },
    getPost: (_parent, { slug }, { prisma }) => {
      return prisma.post.findUnique({ where: { slug } });
    },
  },
  Mutation: {
    createPost: async (
      _parent,
      { slug, title, content, thumbnailURL },
      { prisma }
    ) => {
      const post = await prisma.post.create({
        data: { slug, title, content },
      });
      return post;
    },
    updatePost: async (
      _parent,
      { id, slug, title, content, thumbnailURL },
      { prisma }
    ) => {
      if (thumbnailURL) {
        // ファイル名は自動生成
        let fileKey = Math.random().toString(32).substring(2);
        const itemData = await s3Client.send(
          new ListObjectsCommand({ Bucket: process.env.AWS_BUCKET_NAME })
        );

        // 自動生成したファイル名が万が一既存のファイル名を被っていた場合、ファイル名を再生成する
        // 脆弱性：2回目の生成でも既存ファイル名と被った場合、被った元ファイルが上書きされる
        itemData.Contents?.forEach(({ Key }) => {
          if (Key === fileKey) {
            fileKey = Math.random().toString(32).substring(2);
          }
        });

        const fileExtention = thumbnailURL.slice(
          thumbnailURL.indexOf("/") + 1,
          thumbnailURL.indexOf(";")
        );

        const thumbnail = await prisma.item.create({
          data: { name: `${fileKey}.${fileExtention}` },
        });
        await uploadS3Base64(thumbnailURL, fileKey);

        const post = await prisma.post.update({
          where: {
            id,
          },
          data: { slug, title, content, thumbnailId: thumbnail.id },
        });
        return post;
      }

      const post = await prisma.post.update({
        where: {
          id,
        },
        data: { slug, title, content },
      });
      return post;
    },
  },
  Post: {
    thumbnail: async ({ id }, _args, { prisma }) =>
      await prisma.item.findUnique({ where: { id } }),
  },
};

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTION") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/post",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
