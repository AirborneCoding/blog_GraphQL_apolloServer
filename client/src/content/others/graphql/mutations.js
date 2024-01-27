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

