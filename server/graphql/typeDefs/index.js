const { gql } = require("apollo-server");


const globalSchema = require("./gloablShemas");
const authSchema = require("./auth/auth.schema");
const profileSchema = require("./profile/profile.schema");
const authorSchema = require("./author/author.schema");
const postsSchema = require("./posts/posts.schema");
const commentsSchema = require("./comments/comment.schema");
const othersSchema = require("./others/others.schema");

const typeDefs = gql`
  ${globalSchema},
  ${authSchema},
  ${profileSchema},
  ${authorSchema},
  ${postsSchema},
  ${commentsSchema},
  ${othersSchema},

`;

module.exports = typeDefs;
