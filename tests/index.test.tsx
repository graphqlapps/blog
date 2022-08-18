import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import { GraphQLProvider } from "../src/graphql/GraphQLProvider";

describe("Home", () => {
  it("renders an empty state", () => {
    render(
      <GraphQLProvider>
        <Home />
      </GraphQLProvider>
    );

    const emptyState = screen.getByText("Create a new post");

    expect(emptyState).toBeInTheDocument();
  });
});
