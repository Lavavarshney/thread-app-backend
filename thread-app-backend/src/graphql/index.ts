import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "../lib/db";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws"; // WebSocket server
import { WebSocket } from "http";
import { useServer } from "graphql-ws/lib/use/ws"; // graphql-ws server
import { User } from './user';
import { Post } from './posts';
import { PubSub } from 'graphql-subscriptions';
import { Server } from "http"; // Import the type for HTTP server
import { IncomingMessage } from 'http';
import JWT from "jsonwebtoken"
const JWT_SECRET = '123!@#'
const pubsub = new PubSub();
// Create an instance of PubSub for handling subscriptions
//const pubsub = new PubSub();

async function createApolloGraphqlServer(httpServer: Server) {
  const schema = makeExecutableSchema({
    typeDefs: `
      ${User.typeDefs}
      ${Post.typeDefs}
      type Query {
        ${User.queries}
        ${Post.queries}
      }
      type Mutation {
      ${User.mutations}
      ${Post.mutations}
      }
      type Subscription {
      newPost: Post
      updatedPost: Post
      deletedPost: ID
    }
      `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations,
      },
      Subscription: {
        ...Post.resolvers.subscriptions,
      },
    },
  });

  const gqlServer = new ApolloServer({ 
    schema, 
    formatError: (err) => {
      // Log the error details to the console for debugging
      console.error(err);
      return err;  // Return the error after logging
    },
  });
  await gqlServer.start();

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql", // The same endpoint as HTTP
    verifyClient: (info: { origin: string; req: IncomingMessage }) => {
      // info.origin is the origin of the WebSocket request
      // info.req is the HTTP request object
      if (info.origin === "http://localhost:3000" || info.origin === "https://sandbox.embed.apollographql.com" || info.origin === "http://localhost:8000" ) {
        return true;  // Allow the connection
      }
      console.log('Rejected connection from:', info.origin);
      return false;  // Reject the connection
    },
  });
  

  useServer(
    {
      schema,
      onConnect: (ctx) => {
        // Log the token for debugging
        console.log("WebSocket connection established:", ctx.connectionParams);
        console.log('token', ctx.connectionParams?.token);
        const token = ctx.connectionParams?.token
        if (token && typeof token === 'string') {
          try {
            const decoded = JWT.verify(token, JWT_SECRET); // Verify the token
            console.log('Decoded token:', decoded);
            return { user: decoded }; // Use decoded token info if valid
          } catch (err) {
            console.error('Invalid token:', err);
            throw new Error('Authentication failed');
          }
        }
        
      },
      onDisconnect: (ctx) => {
        console.log("WebSocket connection closed:", ctx.connectionParams);
      },
      onError: (err) => {
        console.error("WebSocket error:", err);
      },
    },
    wsServer
  );

  return gqlServer;
}


export default createApolloGraphqlServer;
export { pubsub };