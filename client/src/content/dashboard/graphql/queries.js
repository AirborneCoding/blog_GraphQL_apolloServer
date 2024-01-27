import { gql } from "@apollo/client"

// # fetch user profile
export const USER_PROFILE = gql`
query GetUserProfile {
  getUserProfile {
    username
    email
    avatar {
      url
    }
    bio
    description
    followersCount
    createdAt
    updatedAt
  }
}
`

// # fetch total data
export const TOTAL_DATA = gql`
query MostViewedArticle {
  totalData {
    mostViewedArticle {
      _id
      title
      slug
    }
    postsCount
    viewsPerMonth
  }
}
`

// # fetch charts views
export const CHART_VIEWS = gql`
query GetUserPostViewsByMonth {
  getUserPostViewsByMonth {
    month
    totalViews
    year
  }
}
`