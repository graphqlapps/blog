import type { NextPage } from "next";
import Link from "next/link";
import { Preview } from "../src/Preview";
import { usePostsQuery } from "../src/types";

const Home: NextPage = () => {
  const postsResponse = usePostsQuery();

  return (
    <>
      <nav className="flex justify-between p-5">
        <Link href={"/"}>
          <a className="text-gray-600 py-1">Home</a>
        </Link>
      </nav>
      <div className="p-5 space-y-20 prose lg:prose-xl mx-auto">
        <h1>Your posts</h1>
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
