import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@uppy/core/dist/style.css";
import "@uppy/status-bar/dist/style.css";
import { GraphQLProvider } from "../src/graphql/GraphQLProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GraphQLProvider>
      <Component {...pageProps} />
    </GraphQLProvider>
  );
}

export default MyApp;
