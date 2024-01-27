import { gql } from "@apollo/client"

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

