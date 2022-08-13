import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorView } from "@codemirror/view";
import { Dispatch } from "react";

export function Editor({
  doc,
  setDoc,
}: {
  doc: string;
  setDoc: Dispatch<string>;
}) {
  return (
    <CodeMirror
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
      ]}
    />
  );
}
