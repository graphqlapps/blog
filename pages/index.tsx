import type { NextPage } from "next";
import Link from "next/link";
import { Preview } from "../src/Preview";
import {
  PostsDocument,
  useCreatePostMutation,
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
            className="bg-blue-400 text-white rounded-xl px-4 py-2 hover:bg-blue-500"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
        <div className="grid grid-cols-1 gap-5">
          {postsResponse.data?.posts.edges.map((edge) => {
            return (
              <Link href={`/posts/${edge.node.slug}/edit`}>
                <a className="border rounded-xl inline-block p-5 h-36 overflow-hidden">
                  <Preview doc={edge.node.content.markdown} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
