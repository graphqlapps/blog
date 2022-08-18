import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";
import { useMemo } from "react";
import Tus from "@uppy/tus";

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
    });
    if (process.env.NODE_ENV === "development") {
      uppy.use(Tus, {
        endpoint: "http://localhost:1080/files/",
        retryDelays: [0, 1000, 3000, 5000],
      });
    } else {
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
    }
    return uppy;
  }, [signature, expires, key]);
};
