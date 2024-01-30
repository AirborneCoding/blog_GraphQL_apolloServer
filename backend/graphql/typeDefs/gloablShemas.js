// msg response
// image
// user

const { gql } = require("apollo-server")

const globalSchema = gql`
 scalar Upload

type Image {
    url: String
    id:String
}

  type PaginationInfo {
    page: Int
    pageSize: Int
    pageCount: Int
    total: Int
}

type Comments {
  _id:String
  postId:String
  user:PostCreator
  text:String
  createdAt: String
}

  type PostData {
    _id: ID
    title: String
    content: String
    user:PostCreator
    slug: String
    category:String
    image: Image
    likes:[String]
    hashtags:[String]
    viewsCount:Int
    commentsCount:Int
    postStatus:String
    createdAt: String
    updatedAt: String
  }

    type DataResult {
    count: Int
    posts:[PostData]
    pagination: PaginationInfo
    allTotalPosts:Int
  }
  
    type PostCreator {
    _id: String
    username: String!
    avatar: Image
    postCount:Int
  }

  type MsgResponse {
    msg: String
}

# type File

 type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

type Query {
  holla: String!
}

type Mutation{
  # uploadProfilePhoto(file:Upload!):File!
    uploadProfilePhoto(file:Upload!):String

}
`

module.exports = globalSchema;