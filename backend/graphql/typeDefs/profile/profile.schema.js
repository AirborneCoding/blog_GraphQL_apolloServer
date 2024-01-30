const { gql } = require("apollo-server")

const profileSchema = gql`
 scalar Upload


  type UserProfile {
    _id: ID!
    username: String!
    email: String!
    avatar: Image
    bio: String
    description: String
    followersCount: Int
    createdAt: String
    updatedAt: String
    # todo : add posts
  }


type UpdateUser{
  user:UserProfile
  msg: String
}

type Query {
    getUserProfile:UserProfile
    getUserPosts(filter:Filter):DataResult
}

type Mutation {
  updateProfile(username:String,email:String,bio:String,description:String):UpdateUser
  deleteProfile:String
  uploadFile(file:Upload!):String
}

input Filter {
  search:String
  sort:String
  postStatus:String
  category:String
  hashtags:String
  page:Int
  pageSize:Int
}

# upload file




`

module.exports = profileSchema;


