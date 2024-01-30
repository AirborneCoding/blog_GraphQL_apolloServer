require("dotenv").config()
require("express-async-errors")

// apollo server configuration with express server
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');


// packages
const fileUPload = require("express-fileupload")
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require("cors")
const mongoSanitize = require('express-mongo-sanitize');

// use routes
const usersRouter = require("./routes/users.routes")
const postsRouter = require("./routes/posts.routes")

// errors middleware
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// resolvers and schemas
const typeDefs = require('./graphql/typeDefs');

const authResolver = require("./graphql/resolvers/auth/auth.resolver")
const profileResolver = require("./graphql/resolvers/profile/profile.resolver")
const authorResolver = require("./graphql/resolvers/author/author.resolver")
const postsResolver = require("./graphql/resolvers/posts/posts.resolver")
const commentsResolver = require("./graphql/resolvers/comments/comments.resolver")
const othersResolver = require("./graphql/resolvers/others/others.resolver")

const resolvers = {
    Query: {
        ...profileResolver.Query,
        ...authorResolver.Query,
        ...postsResolver.Query,
        ...commentsResolver.Query,
        ...othersResolver.Query
    },
    Mutation: {
        ...authResolver.Mutation,
        ...profileResolver.Mutation,
        ...postsResolver.Mutation,
        ...commentsResolver.Mutation
    }
};


const connectDB = require('./db/connectDB');

// call the app
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
    try {

        await connectDB(process.env.MONGO_URI);
        await server.start();

        // use packages & routes
        app.use("/api/v1/posts", postsRouter)

        // restFull
        app.use(helmet());
        app.use(cors());
        app.use(xss());
        app.use(mongoSanitize());
        app.use(express.json())
        app.use(fileUPload({
            useTempFiles: true,
        }))

        // graphql
        app.use(
            '/graphql',
            cors(),
            express.json(),
            expressMiddleware(server),
        );

        // use error handling middlewares
        app.use(notFoundMiddleware)
        app.use(errorHandlerMiddleware)

        const PORT = process.env.PORT || 5000  //process.env.PORT ||
        httpServer.listen({ port: PORT }, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
        });
    } catch (error) {
        console.log("Failed to connect to the database:", error);
    }
}

startServer();
