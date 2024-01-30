import { gql } from "@apollo/client"

// # fetch user profile
export const USER_PROFILE = gql`
query GetUserProfile {
  getUserProfile {
    username
    email
    avatar {
      url
    }
    bio
    description
    followersCount
    createdAt
    updatedAt
  }
}
`