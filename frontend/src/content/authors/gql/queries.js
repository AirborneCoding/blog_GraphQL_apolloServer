import { gql } from "@apollo/client"

// # fetch user profile
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

export const AUTHOR_PROFILE = gql`
query GetAuthorProfile($authorName: String!) {
  getAuthorProfile(authorName: $authorName) {
    _id
    username
    avatar {
      url
    }
    bio
    description
    followersCount
    createdAt
  }
}
`

export const AUTHOR_POSTS = gql`
query GetAuthorPosts($authorName: String!, $page: Int, $pageSize: Int) {
  getAuthorPosts(authorName: $authorName, page: $page, pageSize: $pageSize) {
    count
    pagination {
      page
      pageSize
      pageCount
      total
    }
    posts {
      title
      slug
      category
      image {
        url
      }
      likes
      viewsCount
      commentsCount
      createdAt
    }
  }
}
`