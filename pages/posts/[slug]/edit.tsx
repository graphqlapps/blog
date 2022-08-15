import { useEffect, useState } from "react";
import { Editor } from "../../../src/Editor";
import { Preview } from "../../../src/Preview";
import {
  useEditPostContentMutation,
  usePostBySlugQuery,
} from "../../../src/types";
import { useRouter } from "next/router";
import Link from "next/link";

export default function EditPostPage() {
  const { query } = useRouter();
  const slug = query.slug as string;
  const postBySlug = usePostBySlugQuery({ variables: { input: { slug } } });
  const [doc, setDoc] = useState("");
  const [mode, setMode] = useState<"editor" | "preview">("editor");
  function toggleMode() {
    if (mode === "editor") {
      setMode("preview");
    } else {
      setMode("editor");
    }
  }
  useEffect(() => {
    const markdown = postBySlug.data?.postBySlug.post?.content.markdown;
    if (markdown) {
      setDoc(markdown);
    }
  }, [setDoc, postBySlug.data?.postBySlug.post?.content.markdown]);
  const [editPostContent, { loading }] = useEditPostContentMutation();

  return (
    <div>
      <div className="flex justify-between p-5">
        <Link href={"/"}>
          <a className="text-gray-600 text-xl flex items-center no-underline font-normal py-1">
            Home
          </a>
        </Link>
        <div className="space-x-2">
          <button
            className="px-3 py-1 rounded-lg text-gray-600"
            onClick={toggleMode}
          >
            {mode === "editor" ? "Preview" : "Edit"}
          </button>
          <button
            className="px-3 py-1 rounded-lg bg-blue-400 text-white hover:bg-white border border-blue-400 hover:text-blue-400"
            onClick={() => {
              editPostContent({
                variables: { input: { slug, markdown: doc } },
              });
            }}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div className="p-5">
        {mode === "editor" ? (
          <Editor doc={doc} setDoc={setDoc} />
        ) : (
          <Preview doc={doc} />
        )}
      </div>
    </div>
  );
}
