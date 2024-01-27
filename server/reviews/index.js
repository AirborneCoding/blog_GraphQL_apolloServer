const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { applyMiddleware } = require("graphql-middleware");
const { makeExecutableSchema } = require("@graphql-tools/schema"); // Update this line
const typeDefs = require("./graphQL/typeDefs/index.js")
const resolvers = require("./graphQL/resolvers/index.js")

const app = express();

// Create an executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Apply middleware if needed
// const schemaWithMiddleware = applyMiddleware(schema, yourMiddleware);

const server = new ApolloServer({
    schema,
    // Other Apollo Server options...

    // Custom error formatting
    formatError: (error) => {
        // You can customize the error format here
        console.error(error.message);
        return error;
    },
});

// Apply error handling middleware
app.use((req, res, next) => {
    // Your custom middleware for handling 404 errors
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    // Your custom error handler middleware
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Internal Server Error",
        },
    });
});

// Start the Apollo Server before applying middleware
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
