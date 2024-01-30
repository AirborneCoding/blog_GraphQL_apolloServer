const { gql } = require("apollo-server")



const commentSchema = gql`

type Mutation {
    createComment(postId:ID!,text:String):String 
    deleteComment(commentId:String!):String
    updateComment(commentId:String!):String
}

type Query {
    getPostComments(postSlug:String!):[Comments] 
}

type Subscription {
  commentAdded(postId: ID!): Comments
}

`

module.exports = commentSchema;