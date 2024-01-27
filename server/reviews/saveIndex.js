require("dotenv").config()
require("express-async-errors")
const { StatusCodes } = require('http-status-codes');

const connectDB = require("./db/connectDB")
const { ApolloServer, GraphQLUpload } = require("apollo-server")

const { PubSub } = require("graphql-subscriptions")
const typeDefs = require("./graphQL/typeDefs/index.js")
const resolvers = require("./graphQL/resolvers/index.js")
const pubSub = new PubSub()
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
        throw new Error("Route does not exist");
    },
})

const PORT = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(PORT, () => console.log("server is running on port : " + PORT))
    } catch (error) {
        console.log("something went wrong", error);
    }
}
start()
