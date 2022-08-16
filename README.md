# GraphQLBlog

This example shows a headless markdown editor. Editors can write markdown and preview the result in the browser. Consumers can use GraphQL to fetch the markdown content.

## Getting started

To get started with this template, first install the npm dependencies, run the docker services and finally start the development server:

```bash
yarn install
docker compose up -d
```

The docker command starts both the database and the image hosting service locally.

Next, run the development server:

```bash
yarn dev
```

The dev server should be running at [http://localhost:3000](http://localhost:3000)

## Technologies

These are the technologies this blog is built upon:

Editor:

- [Codemirror](https://codemirror.net) to edit Markdown
- [Tailwind](https://tailwindcss.com/) for styling
- [Uppy](https://uppy.io/) for file uploads
- [Apollo client](https://www.apollographql.com/docs/react/)
- [React markdown](https://github.com/remarkjs/react-markdown) to preview content

Server:

- [GraphQL Yoga](https://www.graphql-yoga.com/)
- [GraphQL Codegen](https://www.graphql-code-generator.com/)
- [Prisma](https://www.prisma.io/) for database
- [Transloadit](https://transloadit.com/) to store images
- [GQL IDE](https://gql.app/) to test GraphQL API
