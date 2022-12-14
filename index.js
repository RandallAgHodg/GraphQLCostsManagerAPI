import { ApolloServer } from "apollo-server";
import typeDefs from "./gql/schema.js";
import resolvers from "./gql/resolver.js";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const server = () => {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;

      if (token) {
        try {
          if (!token.includes("Bearer")) throw new Error("Token not valid");
          const user = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.SECRET_KEY
          );
          return {
            user,
          };
        } catch (error) {
          console.log("#### ERROR ####");
          console.log(error);
          throw new Error("Token not valid");
        }
      }
    },
  });

  serverApollo.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server listening on port ${url}`);
  });
};

server();
