import { gql } from "@apollo/client"


export const HANDLE_LIKE = gql`
mutation HandleLike($postSlug: String!) {
  handleLike(postSlug: $postSlug)
}
`

export const HANDLE_VIEWS = gql`
mutation Mutation($postSlug: String!) {
  handlePostsViews(postSlug: $postSlug)
}
`

