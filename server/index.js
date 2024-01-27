require("dotenv").config()
require("express-async-errors")

const express = require("express")
const { expressMiddleware } = require("@apollo/server/express4")
const { PubSub } = require("graphql-subscriptions");
const createApolloServer = require("./Apollo/apolloConfig");

const connectDB = require("./db/connectDB")

// packages
const {
    fileUPload,
    cors,
    helmet,
    xss,
    mongoSanitize,
    morgan,
    rateLimiter,
} = require("./config/packages/packages")

// use routes
const usersRouter = require("./routes/users.routes")
const postsRouter = require("./routes/posts.routes")

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// start App
async function startApp() {
    const app = express()

    const pubSub = new PubSub();

    const apolloServer = createApolloServer();
    await apolloServer.start();

    app.use(helmet());
    app.use(cors());
    app.use(xss());
    app.use(mongoSanitize());
    // app.use(morgan("tiny"))
    app.use(express.json())
    app.use(fileUPload({
        useTempFiles: true,
        // limits: { fileSize: 5 * 1024 * 1024 },
        // tempFileDir: "/tmp/"
    }))

    // use routes
    app.use("/api/v1/users", usersRouter)
    app.use("/api/v1/posts", postsRouter)
    // graphql
    app.use("/graphql", expressMiddleware(apolloServer, {
        context: async ({ req, res }) => ({ req, pubSub })
    }))

    // use error handling middlewares
    app.use(notFoundMiddleware)
    app.use(errorHandlerMiddleware)

    const connectDatabase = async () => {
        try {
            await connectDB(process.env.MONGO_URI);
            console.log("Connected to the database successfully");
        } catch (error) {
            console.error("Failed to connect to the database:", error);
            process.exit(1);
        }
    };

    // db then start
    const PORT = process.env.PORT || 5000
    const start = async () => {
        try {
            // await connectDB(process.env.MONGO_URI)
            await connectDatabase()
            app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
        } catch (error) {
            console.log("something went wrong", error);
        }
    }

    start()

}

startApp()



// https://studio.apollographql.com/sandbox/explorer






// const PORT = process.env.PORT || 5000
// const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI)
//         server.listen(PORT, () => console.log("server is running on port : " + PORT))
//     } catch (error) {
//         console.log("something went wrong", error);
//     }
// }
// start()
