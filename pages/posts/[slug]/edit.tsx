import { useEffect, useState } from "react";
import { Editor } from "../../../src/Editor";
import { Preview } from "../../../src/Preview";
import { usePostBySlugQuery } from "../../../src/types";
import { useRouter } from "next/router";

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

  return (
    <div>
      <div className="flex justify-end p-5">
        <button onClick={toggleMode}>Preview</button>
      </div>
      <div className="prose lg:prose-xl mx-auto p-5">
        {mode === "editor" ? (
          <Editor doc={doc} setDoc={setDoc} />
        ) : (
          <Preview doc={doc} />
        )}
      </div>
    </div>
  );
}
