import type { NextPage } from "next";
import Link from "next/link";
import { Preview } from "../src/Preview";
import { usePostsQuery } from "../src/types";

const Home: NextPage = () => {
  const postsResponse = usePostsQuery();

  return (
    <div className="p-20 space-y-20">
      <h1>Your stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
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
