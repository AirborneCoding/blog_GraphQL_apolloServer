import { gql } from "@apollo/client"

export const UPDATE_PROFILE = gql`
mutation Mutation($username: String, $email: String, $bio: String, $description: String) {
  updateProfile(username: $username, email: $email, bio: $bio, description: $description) {
    msg
    user {
      username
      email
      avatar {
        id
        url
      }
      bio
      description
    }
  }
}
`