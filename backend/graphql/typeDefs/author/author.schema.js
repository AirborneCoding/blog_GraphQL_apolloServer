const { gql } = require("apollo-server")

// todo : populate his posts
// todo : follow author

const authorSchema = gql`
  type AuthorProfile {
    _id: ID!
    username: String!
    avatar: Image
    bio: String
    description: String
    followersCount: Int
    createdAt: String
  }



type Query {
    getAuthorProfile(authorName:String!):AuthorProfile
    getAuthorPosts(authorName:String!,page:Int,pageSize:Int):AuthorPostResult
}

# globals
# type Image {
#     url: String
#     id:String
# }

#   type PaginationInfo {
#     page: Int
#     pageSize: Int
#     pageCount: Int
#     total: Int
# }

    type AuthorPostResult {
    count: Int
    posts:[PostData]
    pagination: PaginationInfo
  }

`

module.exports = authorSchema;