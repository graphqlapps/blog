import { ReactNode, Dispatch } from "react";
import { MutationTuple } from "@apollo/client";
import {
  EditPostContentMutation,
  EditPostContentMutationVariables,
} from "../graphql/types";
import { useRouter } from "next/router";

export function PostLayout({
  mode,
  setMode,
  editPostContent,
  editPostContentResult,
  children,
  doc,
}: {
  mode: "editor" | "preview";
  doc: string;
  setMode: Dispatch<"editor" | "preview">;
  editPostContent: MutationTuple<
    EditPostContentMutation,
    EditPostContentMutationVariables
  >[0];
  editPostContentResult: MutationTuple<
    EditPostContentMutation,
    EditPostContentMutationVariables
  >[1];
  children?: ReactNode | undefined;
}) {
  const { query } = useRouter();
  const slug = query.slug as string;
  function toggleMode() {
    if (mode === "editor") {
      setMode("preview");
    } else {
      setMode("editor");
    }
  }
  return (
    <div className="min-w-[900px] h-screen overflow-y-auto">
      <nav className="flex justify-end p-2 border-b border-gray-100 sticky top-0 z-10 bg-white">
        <div className="space-x-2">
          <button
            className="p-1 text-gray-400 text-sm hover:bg-gray-100 preview"
            onClick={toggleMode}
          >
            {mode === "editor" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            )}
          </button>
          <button
            className="p-1 text-gray-400 text-sm hover:bg-gray-100 save"
            onClick={() => {
              editPostContent({
                variables: { input: { slug, markdown: doc } },
              });
            }}
          >
            {editPostContentResult.loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {children}
    </div>
  );
}
