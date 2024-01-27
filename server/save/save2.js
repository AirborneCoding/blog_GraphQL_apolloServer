require("dotenv").config()
require("express-async-errors")
const { StatusCodes } = require('http-status-codes');

const express = require("express")
const { ApolloServer } = require("@apollo/server")
const { expressMiddleware } = require("@apollo/server/express4")
const { PubSub } = require("graphql-subscriptions")
const { gql } = require("apollo-server")

const connectDB = require("./db/connectDB")

// packages
const fileUPload = require("express-fileupload")
const morgan = require("morgan")
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require("cors")
const mongoSanitize = require('express-mongo-sanitize');

// use routes
const usersRouter = require("./routes/users.routes")
// graphql
const typeDefs = require("./graphQL/typeDefs/index.js")
const resolvers = require("./graphQL/resolvers/index.js")
const pubSub = new PubSub()

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

// start App
async function startApp() {
    const app = express()

    const server = new ApolloServer({
        typeDefs,
        resolvers,

        context: ({ req }) => ({ req, pubSub }),

        formatError: (err) => {
            let customError = {
                statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
                msg: err.message || 'Something went wrong try again later',
            };
            if (err.extensions.exception._message?.includes('validation failed')) {
                customError.msg = Object.values(err.extensions.exception.errors)
                    .map((item) => item.message)
                    .join(',');
                customError.statusCode = 400;
            }
            if (err.extensions.exception.code && err.extensions.exception.code === 11000) {
                customError.msg = `Duplicate value entered for  ${Object.keys(err.extensions.exception.keyValue)} field, please choose another value`;
                customError.statusCode = 400;
            }
            if (err.extensions.exception._message?.includes('cast error')) {
                customError.msg = `No item found with id : ${err.value}`;
                customError.statusCode = 404;
            }
            return { msg: customError.msg };
        },
        onHealthCheck: async () => {
            // throw new Error("Route does not exist");
            return { status: "ok" };
        },
    })

    await server.start()

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
    // graphql
    app.use("/graphql", expressMiddleware(server))

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
