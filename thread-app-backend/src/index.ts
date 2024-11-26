import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from './graphql/index'
import UserService from "./services/user";
async function init() {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());
  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });
   // Create GraphQL server
   const gqlServer = await createApolloGraphqlServer(httpServer);
  app.use(
    "/graphql",
    expressMiddleware(gqlServer, {
      context: async ({ req }: { req: express.Request }) => {
        const token = req.headers["token"] as string | undefined;
        try {
          const user = token ? UserService.decodeJWTToken(token) : null;
          return { user };
        } catch (error) {
          return { user: null }; // Provide a fallback context
        }
      },
    })
  );
  

  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

init().catch((error) => {
  console.error("Error initializing server:", error);
});
