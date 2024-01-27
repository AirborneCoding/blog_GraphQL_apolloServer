import { gql } from "@apollo/client"

export const BLOG_SEARCH = gql`
query Query($q: String!, $page: Int, $pageSize: Int) {
  blogSearch(q: $q, page: $page, pageSize: $pageSize) {
    authors {
      count
      results {
        _id
        username
        bio
        description
        avatar {
          url
        }
      }
    }
    count
    posts {
      count
      results {
        _id
        title
        content
        hashtags
        category
        postStatus
        image {
          url
        }
        createdAt
        user {
         avatar {
           url
         }
          username
        }
      }
    }
    pagination {
      page
      pageSize
      pageCount
      total
    }
  }
}
`


export const FETCH_FILTRED_POSTS = gql`
query GetAllPosts($page: Int, $pageSize: Int, $hashtags: String, $category: String) {
  getAllPosts(page: $page, pageSize: $pageSize, hashtags: $hashtags, category: $category) {
    allTotalPosts
    count
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
      image {
        url
      }
      likes
      viewsCount
      createdAt
    }
    pagination {
      page
      pageSize
    }
  }
}
`