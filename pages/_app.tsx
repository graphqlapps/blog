import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "@uppy/core/dist/style.css";
import "@uppy/status-bar/dist/style.css";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className="prose lg:prose-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
