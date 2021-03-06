const express = require("express");
const {
  ApolloServer,
  addMockFunctionsToSchema,
} = require("apollo-server-express");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const dayjs = require("dayjs");

const app = express();

const schema = loadSchemaSync("schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});
addMockFunctionsToSchema({ schema });

const mocks = {
  DateTime: () => {
    return dayjs().format();
  },
  Date: () => {
    return dayjs().format("YYYY-MM-DD");
  },
  Email: () => {
    return "test@test.com"
  }
};

const server = new ApolloServer({ schema, mocks });

server.applyMiddleware({ app });

app.listen({ port: 4000, path: "/graphql" }, () => {
  console.log("Server is ready http://localhost:4000/graphql");
});
