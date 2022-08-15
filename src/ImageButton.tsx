import Uppy from "@uppy/core";

export function ImageButton({ uppy }: { uppy: Uppy }) {
  return (
    <div className="flex items-center">
      <label htmlFor="image-input" className="p-4">
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </label>
      <input
        onChange={(event) => {
          if (event.target.files) {
            const files = Array.from(event.target.files);
            files.forEach((file) => {
              try {
                uppy.addFile({
                  source: "file input",
                  name: file.name,
                  type: file.type,
                  data: file,
                });
              } catch (err) {
                console.error(err);
              }
            });
          }
        }}
        id="image-input"
        className="hidden"
        type="file"
      />
    </div>
  );
}
