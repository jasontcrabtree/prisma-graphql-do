const { gql } = require('apollo-server');

const typeDefs = gql`
  # Post: Defines the type for a post in your blogging app and contains four fields where each field is followed by its type, for example, String.

  type Post {
    content: String
    id: ID!
    published: Boolean!
    title: String!
  }

  # Query: Defines the feed query which returns multiple posts as denoted by the square brackets and the post query which accepts a single argument and returns a single Post.
  type Query {
    feed: [Post!]!
    post(id: ID!): Post
  }

  # Mutation: Defines the createDraft mutation for creating a draft Post and the publish mutation which accepts an id and returns a Post.
  type Mutation {
    createDraft(content: String, title: String!): Post!
    publish(id: ID!): Post
  }
`;

// Posts array (hardcoded for exercise)
/*
- Structure of each post object matches the Post type defined in the schema.
- This array holds the posts that will be served by the API.
- Will replace the array once the database and Prisma Client are introduced.
*/
const posts = [
  {
    id: 1,
    title: 'Subscribe to GraphQL Weekly for community news ',
    content: 'https://graphqlweekly.com/',
    published: true,
  },
  {
    id: 2,
    title: 'Follow DigitalOcean on Twitter',
    content: 'https://twitter.com/digitalocean',
    published: true,
  },
  {
    id: 3,
    title: 'What is GraphQL?',
    content: 'GraphQL is a query language for APIs',
    published: false,
  },
];

// GraphQL Resolver functions = structure
// const resolvers = {
//     Query: {},
//     Mutation: {},
//     Post: {}
// }
const resolvers = {
  Query: {
    feed: (parent, args) => {
      return posts.filter(post => post.published);
    },
    post: (parent, args) => {
      return posts.find(post => post.id === Number(args.id));
    },
  },
  Mutation: {
    createDraft: (parent, args) => {
      posts.push({
        id: posts.length + 1,
        title: args.title,
        content: args.content,
        published: false,
      });
      return posts[posts.length - 1];
    },
    publish: (parent, args) => {
      const postToPublish = posts.find(post => post.id === Number(args.id));
      postToPublish.published = true;
      return postToPublish;
    },
  },
  Post: {
    content: parent => parent.content,
    id: parent => parent.id,
    published: parent => parent.published,
    title: parent => parent.title,
  },
};

/* Define the resolvers following the same structure as the GraphQL schema. Every field in the schema’s types has a corresponding resolver function whose responsibility is to return the data for that field in your schema. */

/*
## Resolver functions take four arguments:
- Parent: The return value of the previous resolver in the resolver chain. For top-level resolvers, the parent is `undefined` when no previous resolvers have been called
- Args: The argument carries the parameters of the query e.g. post.id
- Context: An object that the resolver can read and write to/from, enabling resolvers to share information
- Info: An AST (Abstract syntax tree) representation of the query/mutation
*/

// Since the context and info are not necessary in these resolvers, only parent and args are defined.

module.exports = {
  resolvers,
  typeDefs,
};
