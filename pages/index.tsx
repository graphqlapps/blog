import type { NextPage } from "next";
import Link from "next/link";
import { Preview } from "../src/Preview";
import {
  PostsDocument,
  useCreatePostMutation,
  useDeletePostMutation,
  usePostsQuery,
} from "../src/types";
import Router from "next/router";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

const Home: NextPage = () => {
  const postsResponse = usePostsQuery();
  const [createPost, { loading }] = useCreatePostMutation({
    refetchQueries: [PostsDocument],
  });
  const [deletePost] = useDeletePostMutation({
    refetchQueries: [PostsDocument],
  });

  return (
    <>
      <nav className="flex justify-between p-5">
        <Link href={"/"}>
          <a className="text-gray-600 py-1">Home</a>
        </Link>
      </nav>
      <div className="p-5 space-y-20 prose lg:prose-xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="!m-0">Your posts</h1>
          <button
            onClick={() => {
              createPost({
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
                  Router.push(`/posts/${res.data.createPost.post.slug}/edit`);
                }
              });
            }}
            className="bg-blue-400 text-white rounded-xl px-4 py-2 hover:bg-blue-500 flex items-center gap-2"
          >
            {loading ? (
              "..."
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {postsResponse.data?.posts.edges.map((edge) => {
            return (
              <div
                key={edge.node.id}
                className="flex gap-5 w-full justify-between items-center"
              >
                <Link href={`/posts/${edge.node.slug}/edit`}>
                  <a className="border rounded-xl inline-block p-5 h-36 overflow-hidden space-y-5 flex-1">
                    <div>{edge.node.slug}</div>
                    <Preview doc={edge.node.content.markdown} />
                  </a>
                </Link>
                <button
                  onClick={() => {
                    deletePost({
                      variables: { input: { slug: edge.node.slug } },
                    });
                  }}
                  className="hover:text-red-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
