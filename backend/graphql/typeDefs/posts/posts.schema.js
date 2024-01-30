const { gql } = require("apollo-server")

const postSchema = gql`

type Query {
    getAllPosts(search:String,page:Int,pageSize:Int,hashtags:String,category:String):DataResult
    getSinglePost(postSlug:String!):PostData
    getSimilarPosts(postSlug:String!):[PostData]
}

type Mutation {
    deletePost(postId:String!):String 
    handleLike(postSlug:String!):String
    createPost(input_addPost:_createPost!):String
    handlePostsViews(postSlug:String!):String!
}

input _createPost {
    user:ID
    title:String!
    content:String!
    hashtags:[String]
    category:String!
    postStatus:String!
    image:String
}

# subscription


type Subscription {
  postLiked: PostData
  newPost:PostData
#   postCommented: Post
}


`

module.exports = postSchema;