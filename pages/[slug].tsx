import { useEffect, useState } from "react";
import { Editor } from "../src/editor/Editor";
import { Preview } from "../src/editor/Preview";
import {
  PostsDocument,
  useDeletePostMutation,
  useEditPostContentMutation,
  usePostBySlugQuery,
  usePostsQuery,
} from "../src/graphql/types";
import { useRouter } from "next/router";
import { Layout } from "../src/ui/Layout";
import { useCreatePost } from "../src/graphql/useCreatePost";
import { PostLayout } from "../src/ui/PostLayout";

export default function EditPostPage() {
  const { query } = useRouter();
  const slug = query.slug as string;
  const postBySlug = usePostBySlugQuery({ variables: { input: { slug } } });
  const [doc, setDoc] = useState("");
  const [mode, setMode] = useState<"editor" | "preview">("editor");
  useEffect(() => {
    const markdown = postBySlug.data?.postBySlug.post?.content.markdown;
    if (markdown) {
      setDoc(markdown);
    }
  }, [setDoc, postBySlug.data?.postBySlug.post?.content.markdown]);
  const [editPostContent, editPostContentResult] = useEditPostContentMutation();
  const [createPost] = useCreatePost();
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
      <PostLayout
        doc={doc}
        editPostContent={editPostContent}
        editPostContentResult={editPostContentResult}
        mode={mode}
        setMode={setMode}
      >
        {mode === "editor" ? (
          <Editor doc={doc} setDoc={setDoc} />
        ) : (
          <Preview doc={doc} />
        )}
      </PostLayout>
    </Layout>
  );
}
