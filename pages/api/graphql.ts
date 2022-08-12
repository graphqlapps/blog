import { createServer } from "@graphql-yoga/node";
import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { renderGraphiQL } from "@graphqlapps/ide";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  renderGraphiQL,
  schema: {
    typeDefs: readFileSync(join(process.cwd(), "schema.graphql"), {
      encoding: "utf-8",
    }),
  },
});
