import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export function Preview({ doc }: { doc: string }) {
  return (
    <div>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                // @ts-ignore
                style={dark}
                language={match[1]}
                PreTag={Fragment}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {doc}
      </ReactMarkdown>
    </div>
  );
}
