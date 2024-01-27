const { gql } = require("apollo-server")

const othersSchema = gql`
type TopCategories {
  _id: String
  count:Int
}
type TopHashtags {
  _id: String
  count:Int
}
type Top5 {
    topCategories:[TopCategories]
    topHashtags:[TopHashtags]
}
type ViewsByMonth {
    year:String
    month:String
    totalViews:Int
}

type _mostViewedArticle {
    _id:ID
    title:String
    slug:String
}
type total_Data {
    postsCount:Int
    viewsPerMonth:Int
    mostViewedArticle:_mostViewedArticle
}

# blog search
type Post {
  _id: ID!
  title: String!
  content: String!
  hashtags: [String!]!
  category: String!
  postStatus: String!
  user: User!
  image: Image!
  createdAt: String
}

type User {
  _id: ID!
  username: String!
  bio: String
  description: String
  avatar: Image
}

type SearchResult {
  count: Int!
  posts: SearchResultPosts!
  authors: SearchResultAuthors!
  pagination: Pagination!
}

type SearchResultPosts {
  count: Int!
  results: [Post!]!
}

type SearchResultAuthors {
  count: Int!
  results: [User!]!
}

type Pagination {
  page: Int!
  pageSize: Int!
  pageCount: Int!
  total: Int!
}

type Top_5_Authros {
  avatar: Image
  username:String!
  postCount:Int
}

# end

extend type Query {
    top5_Cate_Hash:Top5
    getUserPostViewsByMonth:[ViewsByMonth!]
    totalData:total_Data
    fetchTopAuthors:[PostCreator]
    blogSearch(q: String!, pageSize: Int, page: Int): SearchResult!
 }
`



module.exports = othersSchema;