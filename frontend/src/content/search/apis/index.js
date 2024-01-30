import GraphQLClient from "../../../config/graphqlRequest"
import { BLOG_SEARCH } from "../graphql/queries";


const fetchBlogSearchApi = async (query, page) => {
    try {
        const res = await GraphQLClient.request(BLOG_SEARCH, {
            q: query,
            page,
        });
        return res?.blogSearch;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export {
    fetchBlogSearchApi
}