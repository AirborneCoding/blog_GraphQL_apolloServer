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

// # fetch single Post
export const FETCH_SINGLE_POST = gql`
query GetSinglePost($postSlug: String!) {
  getSinglePost(postSlug: $postSlug) {
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
    createdAt
  }
}
`

// # fetch similar Posts
export const FETCH_SIMILAR_POST = gql`
query GetSimilarPosts($postSlug: String!) {
  getSimilarPosts(postSlug: $postSlug) {
    _id
    title
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
    viewsCount
    commentsCount
    createdAt
  }
}
`