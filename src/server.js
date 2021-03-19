const { ApolloServer } = require('apollo-server');
const { resolvers, typeDefs } = require('./schema');

const port = process.env.PORT || 8080;

// Here you instantiate the server and pass the schema and resolvers from the previous step.
new ApolloServer({ resolvers, typeDefs }).listen({ port }, () =>
  console.log(`Server ready at: http://localhost:${port} `)
);

/* The port the server will bind to is set from the PORT environment variable and if not set, it will default to 8080. The PORT environment variable will be automatically set by App Platform and ensure your server can accept connections once deployed. */
