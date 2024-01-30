import { gql } from "@apollo/client"

// # fetch Home Posts
export const FETCH_HOME_POSTS = gql`
query GetAllPosts($page: Int, $pageSize: Int) {
  getAllPosts(page: $page, pageSize: $pageSize) {
    posts {
      _id
      title
      content
      user {
        username
        avatar {
          url
        }
      }
      slug
      category
      image {
        url
      }
      likes
      hashtags
      viewsCount
      commentsCount
      postStatus
      createdAt
    }
  }
}
`

export const TOP5_AUTHORS = gql`
query {
  fetchTopAuthors {
    username
    avatar {
      url
    }
    postCount
  }
}
`

export const TOP5_C_H = gql`
query Top5_Cate_Hash {
  top5_Cate_Hash {
    topCategories{
      _id
      count
    }
    topHashtags{
      _id
      count
    }
  }
}
`