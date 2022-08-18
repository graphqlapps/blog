import Router from "next/router";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { PostsDocument, useCreatePostMutation } from "./types";

export function useCreatePost() {
  const [create, status] = useCreatePostMutation({
    refetchQueries: [PostsDocument],
  });
  function createPost() {
    return create({
      variables: {
        input: {
          slug: uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
            separator: "-",
            length: 3,
          }),
        },
      },
    }).then((res) => {
      if (res.data?.createPost.post) {
        Router.push(`/${res.data.createPost.post.slug}`);
      }
    });
  }
  return { createPost, status };
}
