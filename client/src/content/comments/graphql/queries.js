import { gql } from "@apollo/client"


// # fetch  Posts comments
export const FETCH_POST_COMMENTS = gql`
query GetPostComments($postSlug: String!) {
  getPostComments(postSlug: $postSlug) {
    _id
    postId
    text
    user {
      avatar {
        url
      }
      username
    }
    createdAt
  }
}
`
