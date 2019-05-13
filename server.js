require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const { findOrCreateUser } = require("./controllers/userController");
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        //find or create user
        currentUser = await findOrCreateUser(authToken);
      }
    } catch {
      console.error("Unable to authenticate user with that token ");
    }
    return { currentUser };
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ port }) => {
  console.log(`Server listening on port ${port}`);
});
