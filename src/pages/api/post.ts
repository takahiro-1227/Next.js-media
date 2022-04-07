import { prisma } from "../../libs/prisma";
import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import Cors from "micro-cors";
import typeDefs from "../../api/Post.typeDefs";
import { Resolvers } from "../../generated";

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
    createPost: async (_parent, { slug, title, content }, { prisma }) => {
      const post = await prisma.post.create({
        data: { slug, title, content },
      });
      return post;
    },
    updatePost: async (_parent, { id, slug, title, content }, { prisma }) => {
      const post = await prisma.post.update({
        where: {
          id,
        },
        data: { slug, title, content },
      });
      return post;
    },
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
