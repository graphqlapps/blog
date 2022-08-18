import { MutationTuple } from "@apollo/client";
import {
  CreatePostMutation,
  CreatePostMutationVariables,
} from "../graphql/types";

export function EmptyPostPage({
  createPost,
  createPostResult,
}: {
  createPost: MutationTuple<CreatePostMutation, CreatePostMutationVariables>[0];
  createPostResult: MutationTuple<
    CreatePostMutation,
    CreatePostMutationVariables
  >[1];
}) {
  return (
    <div className="h-screen flex items-center justify-center">
      <button
        disabled={createPostResult.loading}
        onClick={() => {
          createPost();
        }}
        className="border border-gray-300 hover:border-gray-400 border-dashed w-96 h-56 flex flex-col items-center justify-center rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-300"
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
        <span>Create a new post</span>
      </button>
    </div>
  );
}
