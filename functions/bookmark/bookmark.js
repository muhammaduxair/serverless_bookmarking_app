require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb"),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
    allBookmarks: [Bookmark!]
  }
  type Mutation {
    addBookmark(title: String!, url: String!, bg: String!): Bookmark
    deleteBookmark(id: ID!): Bookmark
  }
  type Bookmark {
    ref: String!
    data: BookMarkdata
  }
  type BookMarkdata {
    title: String!
    url: String!
    bg: String!
  }
`;

const resolvers = {
  Query: {
    allBookmarks: async () => {
      const client = new faunadb.Client({
        secret: process.env.FAUNADB_ADMIN_SECRET,
      });
      const allDocuments = await client.query(
        q.Map(
          q.Paginate(q.Documents(q.Collection("bookmark"))),
          q.Lambda("X", q.Get(q.Var("X")))
        )
      );
      return allDocuments.data.map((obj) => ({
        ref: JSON.stringify(obj.ref),
        data: { title: obj.data.title, url: obj.data.url, bg: obj.data.bg },
      }));
    },
  },
  Mutation: {
    addBookmark: async (_, args) => {
      const client = new faunadb.Client({
        secret: process.env.FAUNADB_ADMIN_SECRET,
      });
      const res = await client.query(
        q.Create(q.Collection("bookmark"), {
          data: { title: args.title, url: args.url, bg: args.bg },
        })
      );
      return {
        ref: JSON.stringify(res.ref),
        data: { title: res.data.title, url: res.data.url, bg: res.data.bg },
      };
    },
    deleteBookmark: async (_, args) => {
      const client = new faunadb.Client({
        secret: process.env.FAUNADB_ADMIN_SECRET,
      });
      const res = await client.query(
        q.Delete(q.Ref(q.Collection("bookmark"), args.id))
      );
      return {
        ref: JSON.stringify(res.ref),
        data: { title: res.data.title, url: res.data.url, bg: res.data.bg },
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
