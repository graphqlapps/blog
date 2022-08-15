import type { NextPage } from "next";
import Link from "next/link";
import { Preview } from "../src/Preview";
import { usePostsQuery } from "../src/types";

const Home: NextPage = () => {
  const postsResponse = usePostsQuery();

  return (
    <div className="p-5 space-y-20">
      <h1 className="text-gray-600">Your stories</h1>
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
  );
};

export default Home;
