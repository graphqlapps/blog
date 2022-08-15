import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import { useMemo } from "react";

export const useUppy = ({
  expires,
  signature,
  key,
}: {
  signature?: string;
  expires?: string;
  key?: string;
}) => {
  return useMemo(() => {
    const uppy = new Uppy({
      autoProceed: true,
      restrictions: { maxNumberOfFiles: 1 },
    });
    if (signature && expires && key) {
      uppy.use(Transloadit, {
        waitForEncoding: true,
        signature,
        params: {
          auth: {
            key,
            expires,
          },
          steps: {
            // https://transloadit.com/docs/topics/assembly-instructions/#order-of-execution
            ":original": {
              robot: "/upload/handle",
            },
          },
        },
      });
    }
    return uppy;
  }, [signature, expires, key]);
};
