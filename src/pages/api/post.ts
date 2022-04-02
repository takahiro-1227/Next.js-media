import { prisma } from '../../libs/prisma';
import { ApolloServer } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
import Cors from 'micro-cors';
import typeDefs from '../../api/Post.typeDefs';

export type Context = {
  prisma: PrismaClient;
}

export async function createContext(): Promise<Context> {
  return {
    prisma,
  }
}
export const resolvers = {
  Query: {
    getPosts: (_parent: any, _args: any, {prisma}: any) => {
      return prisma.post.findMany();
    },
    getPost: (_parent: any, {slug}: any, {prisma}: any) => {
      return prisma.post.findUnique({where: {slug}})
    }
  },
  Mutation: {
    createPost: async (_parent: any, {slug, title, content}: any, {prisma}: any) => {
      const post = await prisma.post.create({
        data: {slug, title, content},
      })
      return post;
    },
    updatePost: async (_parent: any, {id, slug, title, content}: any, {prisma}: any) => {
      const post = await prisma.post.update({
        where: {
          id
        },
        data: {slug, title, content},
      })
      return post;
    },
  }
}


const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTION') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/post',
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}