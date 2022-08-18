import { ReactNode } from "react";
import {
  PostsDocument,
  useCreatePostMutation,
  useDeletePostMutation,
  usePostsQuery,
} from "../src/types";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

export function Layout({ children }: { children?: ReactNode | undefined }) {
  const [createPost] = useCreatePostMutation({
    refetchQueries: [PostsDocument],
  });
  const [deletePost] = useDeletePostMutation({
    refetchQueries: [PostsDocument],
  });
  const postsQuery = usePostsQuery();
  const router = useRouter();
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <nav className="bg-gray-50 flex flex-col justify-between text-sm h-screen overflow-y-auto">
        <div className="space-y-5">
          <Link href="/">
            <a className="flex items-center w-full p-2 gap-2 text-gray-500 hover:bg-gray-200 sticky top-0">
              Home
            </a>
          </Link>
          <ul className="py-2">
            {postsQuery.data?.posts.edges.map((post) => (
              <li
                key={post.node.id}
                className={`p-2 flex justify-between hover:bg-gray-200 ${
                  router.query.slug === post.node.slug ? "bg-gray-200" : ""
                }`}
              >
                <Link href={`/${post.node.slug}`}>
                  <a
                    className={`inline-block p-2 w-full text-gray-500 ${
                      router.query.slug === post.node.slug
                        ? "font-medium text-black"
                        : ""
                    }`}
                  >
                    {post.node.slug}
                  </a>
                </Link>
                <button
                  onClick={() => {
                    deletePost({
                      variables: { input: { slug: post.node.slug } },
                    }).then(() => {
                      if (router.query.slug === post.node.slug) {
                        Router.push("/");
                      }
                    });
                  }}
                  className="hover:text-red-400 text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
              </li>
            ))}
          </ul>
        </div>
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
                Router.push(`/${res.data.createPost.post.slug}`);
              }
            });
          }}
          className="flex items-center w-full p-2 gap-2 text-gray-500 hover:bg-gray-200 border-t border-gray-200 sticky bottom-0"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          New page
        </button>
      </nav>
      {children}
    </div>
  );
}
