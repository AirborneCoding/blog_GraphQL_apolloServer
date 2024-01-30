const authResolver = require("./auth/auth.resolver")
const profileResolver = require("./profile/profile.resolver")
const authorResolver = require("./author/author.resolver")
const postsResolver = require("./posts/posts.resolver")
const commentsResolver = require("./comments/comments.resolver")
const othersResolver = require("./others/others.resolver")

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
    },
    Subscription: {
        ...postsResolver.Subscription,
    }
};

module.exports = resolvers;
