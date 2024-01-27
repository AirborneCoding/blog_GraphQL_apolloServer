const { gql } = require("apollo-server")

const authSchema = gql`
  type UserData{
    _id:ID!
    username:String!
    email:String!
    isVerified:Boolean!
    token:String!
  }

  type RegisterResponse{
    user:UserData
    msg:String
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String, password: String!): RegisterResponse
    verifyEmail(verificationToken:String!,email: String!):MsgResponse
    forgotPassword(email:String!):MsgResponse
    resetPassword(token:String!, email:String!, password:String!):MsgResponse
    changePassword(oldPassword:String!, newPassword:String):String
  }
`

module.exports = authSchema;