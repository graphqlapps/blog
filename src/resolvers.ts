import { randomUUID } from "crypto";
import { Post, Resolvers } from "./types";

const postsBySlug: Record<string, Post> = {};

export const resolvers: Resolvers = {
  Query: {
    postBySlug: async (_, { input: { slug } }) => {
      return {
        post: postsBySlug[slug],
      };
    },
  },
  Mutation: {
    createPost: async (_, { input: { slug } }) => {
      const post: Post = {
        id: randomUUID(),
        slug,
        content: {
          markdown: "# Hello markdown\n\n```javascript\nlet x = 'y'\n```",
        },
      };
      postsBySlug[slug] = post;

      return {
        post,
      };
    },
  },
};
