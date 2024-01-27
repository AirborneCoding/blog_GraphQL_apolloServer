import { gql } from "@apollo/client"


export const ADD_COMMENT = gql`
mutation Mutation($postId: ID!, $text: String) {
  createComment(postId: $postId, text: $text)
}
`

export const DELETE_COMMENT = gql`
mutation DeleteComment($commentId: String!) {
  deleteComment(commentId: $commentId)
}
`
