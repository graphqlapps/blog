import type { NextPage } from "next";
import { Layout } from "../src/ui/Layout";
import {
  PostsDocument,
  useDeletePostMutation,
  usePostsQuery,
} from "../src/graphql/types";
import { useCreatePost } from "../src/graphql/useCreatePost";
import { EmptyPostPage } from "../src/ui/EmptyPostPage";

const Home: NextPage = () => {
  const [createPost, createPostResult] = useCreatePost();
  const postsQueryResult = usePostsQuery();
  const [deletePost] = useDeletePostMutation({
    refetchQueries: [PostsDocument],
  });

  return (
    <Layout
      postsQueryResult={postsQueryResult}
      createPost={createPost}
      deletePost={deletePost}
    >
      <EmptyPostPage
        createPost={createPost}
        createPostResult={createPostResult}
      />
    </Layout>
  );
};

export default Home;
