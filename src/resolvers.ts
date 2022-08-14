import { Resolvers } from "./types";
import { prisma } from "./db";

export const resolvers: Resolvers = {
  Query: {
    posts: async () => {
      const posts = await prisma.post.findMany({ include: { content: true } });
      return {
        edges: posts.map((post) => ({
          node: post,
        })),
      };
    },
    postBySlug: async (_, { input: { slug } }) => {
      return {
        post: await prisma.post.findUnique({
          where: { slug },
          include: { content: true },
        }),
      };
    },
  },
  Post: {
    __isTypeOf: (obj) => {
      return obj.postContentId !== undefined;
    },
  },
  Mutation: {
    createPost: async (_, { input: { slug } }) => {
      const post = await prisma.post.create({
        data: {
          slug,
          content: {
            create: {
              markdown: "# Hello markdown\n\n```javascript\nlet x = 'y'\n```",
            },
          },
        },
        include: {
          content: true,
        },
      });

      return {
        post,
      };
    },
    editPostContent: async (_, { input: { markdown, slug } }) => {
      const post = await prisma.post.update({
        where: { slug },
        data: {
          content: {
            update: {
              markdown,
            },
          },
        },
        include: {
          content: true,
        },
      });

      return {
        post,
      };
    },
  },
};
