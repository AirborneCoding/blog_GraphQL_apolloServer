import GraphQLClient from "../../../config/graphqlRequest"
import { HANDLE_LIKE } from "../gql/mutations";
import { FETCH_HOME_POSTS, TOP5_AUTHORS, TOP5_C_H } from "../gql/queries";


const fetchHomePosts = async (page, pageSize) => {
    try {

        const res = await GraphQLClient.request(
            developmentUrlGraphql,
            FETCH_HOME_POSTS,
            {
                page,
                pageSize
            }
        );
        return res?.getAllPosts?.posts;
    } catch (error) {
        console.log("from api", error);
    }
}

const fetchTop5AuthorsAPI = async () => {
    try {
        const res = await GraphQLClient.request(TOP5_AUTHORS)
        return res?.fetchTopAuthors
    } catch (error) {
        console.log("from api", error);
    }
}

const fetchTop5_C_H_API = async () => {
    try {
        const res = await GraphQLClient.request(TOP5_C_H)
        return res?.top5_Cate_Hash
    } catch (error) {
        console.log("from api", error);
    }
}

const handleLikeApi = async (postSlug) => {
    try {
        const res = await GraphQLClient.request(HANDLE_LIKE, { postSlug: postSlug })
    } catch (error) {
        console.log("from api", error);
    }
}


export {
    fetchTop5AuthorsAPI,
    fetchHomePosts,
    fetchTop5_C_H_API,
    handleLikeApi
}