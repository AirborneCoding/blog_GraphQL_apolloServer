import GraphQLClient from "../../../config/graphqlRequest"
import { developmentUrlGraphql } from "../../../utils";
import { FETCH_HOME_POSTS, FETCH_SIMILAR_POST, FETCH_SINGLE_POST } from "../gql/queries";
import { HANDLE_LIKE, HANDLE_VIEWS } from "../gql/mutations";
import { request } from 'graphql-request'

export const fetchHomePosts = async (pageParam, LIMIT) => {
    console.log(pageParam, LIMIT);
    try {
        const res = await GraphQLClient.request(
            FETCH_HOME_POSTS,
            {
                page: pageParam,
                pageSize: LIMIT
            }
        );
        return res?.getAllPosts?.posts;
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


const fetchSinglePostApi = async (postSlug) => {
    try {
        const res = await GraphQLClient.request(FETCH_SINGLE_POST, { postSlug: postSlug })
        return res?.getSinglePost
    } catch (error) {
        console.log("from api", error);
    }
}

const fetchSimilarPostsApi = async (postSlug) => {
    try {
        const res = await GraphQLClient.request(FETCH_SIMILAR_POST, { postSlug: postSlug })
        return res?.getSimilarPosts
    } catch (error) {
        console.log("from api", error);
    }
}

const handleViewsApi = async (postSlug) => {
    try {
        const res = await GraphQLClient.request(HANDLE_VIEWS, { postSlug: postSlug })
        // console.log("api", res);
        return res
    } catch (error) {
        console.log("from api", error);
    }
}

export {
    handleLikeApi,
    fetchSinglePostApi,
    fetchSimilarPostsApi,
    handleViewsApi,
}