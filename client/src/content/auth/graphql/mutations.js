import { gql } from "@apollo/client"

export const LOGIN = gql`
mutation($email: String!,$password: String!) {
  login(email: $email,password: $password) {
    msg
    user {
      _id
      username
      email
      isVerified
      token
    }
  }
}
`

export const CHANGE_PASSWORD = gql`
mutation($oldPassword: String!, $newPassword: String) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
`

export const DELETE_PROFILE = gql`
mutation Mutation {
  deleteProfile
}
`