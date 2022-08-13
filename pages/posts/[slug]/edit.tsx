import { useState } from "react";
import { Editor } from "../../../src/Editor";
import { Preview } from "../../../src/Preview";

export default function EditPostPage() {
  const [doc, setDoc] = useState(
    "# Hello markdown\n\n```javascript\nlet x = 'y'\n```"
  );
  const [mode, setMode] = useState<"editor" | "preview">("editor");
  function toggleMode() {
    if (mode === "editor") {
      setMode("preview");
    } else {
      setMode("editor");
    }
  }
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
