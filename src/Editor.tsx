import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorView } from "@codemirror/view";
import { EditorState, EditorSelection } from "@codemirror/state";
import { Dispatch, useEffect, useRef, useState } from "react";
import { StatusBar } from "@uppy/react";
import { ImageButton } from "./ImageButton";
import { useUppy } from "./uppy";

export function Editor({
  doc,
  setDoc,
}: {
  doc: string;
  setDoc: Dispatch<string>;
}) {
  const [auth, setAuth] = useState<{
    signature?: string;
    expires?: string;
    key?: string;
  }>({});
  const uppy = useUppy(auth);
  useEffect(() => {
    fetch("/api/signature")
      .then((res) => res.json())
      .then(({ signature, expires, key }) => {
        setAuth({ signature, expires, key });
      });
  }, []);
  const stateRef = useRef<EditorState | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const selection = useRef<EditorSelection | null>(null);
  useEffect(() => {
    uppy.on("complete", ({ successful, failed }) => {
      const url = successful[0].uploadURL;
      const name = successful[0].name;

      if (viewRef.current && selection.current) {
        const range = selection.current.ranges[0];
        viewRef.current.dispatch({
          changes: {
            from: range.from,
            to: range.to,
            insert: `![${name}](${url})`,
          },
          selection: { anchor: range.from + 1 },
        });

        viewRef.current.focus();
        selection.current = null;
      }
    });
  }, [uppy]);

  return (
    <div className="prose lg:prose-xl mx-auto">
      <StatusBar uppy={uppy} hideAfterFinish={true} showProgressDetails />
      <div className="border-b justify-end flex mb-4">
        <div className="hover:bg-gray-50">
          <ImageButton uppy={uppy} />
        </div>
      </div>
      <CodeMirror
        onUpdate={({ state }) => {
          if (state.selection) {
            selection.current = state.selection;
          }
        }}
        onCreateEditor={(v, s) => {
          viewRef.current = v;
          stateRef.current = s;
        }}
        autoFocus
        theme={EditorView.theme({
          ".cm-editor": {
            height: "100%",
          },
          ".cm-content": {
            fontFamily: "Menlo, Monaco, Lucida Console, monospace",
          },
          ".cm-gutters": {
            display: "none",
          },
        })}
        basicSetup={{
          lineNumbers: false,
          highlightActiveLine: false,
        }}
        value={doc}
        onChange={setDoc}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
          EditorView.lineWrapping,
        ]}
      />
    </div>
  );
}
