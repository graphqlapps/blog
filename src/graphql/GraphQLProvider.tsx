import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export function GraphQLProvider({
  children,
}: {
  children?: ReactNode | undefined;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
