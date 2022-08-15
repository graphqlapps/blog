import { NextApiHandler } from "next";
import crypto from "crypto";

// https://transloadit.com/docs/topics/signature-authentication/
const utcDateString = (ms: number) => {
  return new Date(ms)
    .toISOString()
    .replace(/-/g, "/")
    .replace(/T/, " ")
    .replace(/\.\d+Z$/, "+00:00");
};

// expire 1 hour from now (this must be milliseconds)
const expires = utcDateString(Date.now() + 1 * 60 * 60 * 1000);
const key = process.env.TRANSLOADIT_KEY!;
const authSecret = process.env.TRANSLOADIT_SECRET!;

const signatureHandler: NextApiHandler = (req, res) => {
  const params = JSON.stringify({
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
  });
  const signatureBytes = crypto
    .createHmac("sha384", authSecret)
    .update(Buffer.from(params, "utf-8"));
  // The final signature needs the hash name in front, so
  // the hashing algorithm can be updated in a backwards-compatible
  // way when old algorithms become insecure.
  const signature = `sha384:${signatureBytes.digest("hex")}`;
  res.status(200).json({ signature, expires, key });
};

export default signatureHandler;
