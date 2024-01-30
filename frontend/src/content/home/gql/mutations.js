import { gql } from "@apollo/client"

export const HANDLE_LIKE = gql`
mutation HandleLike($postSlug: String!) {
  handleLike(postSlug: $postSlug)
}
`