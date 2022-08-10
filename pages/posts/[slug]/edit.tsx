import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

export default function EditPostPage() {
  return <Editor />;
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    onError: () => {},
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="max-w-3xl mx-auto relative mt-5">
        <PlainTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[150px] outline-0" />
          }
          placeholder={
            <div className="absolute top-0 left-0 text-gray-400 text-lg overflow-hidden select-none pointer-events-none">
              Tell your story...
            </div>
          }
        />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
}
