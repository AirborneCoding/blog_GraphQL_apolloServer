import graphQLClient from "../../../config/graphqlRequest";
import { USER_PROFILE } from "../gql/queries";

const fetchUserProfileApi = async () => {
    try {
        const res = await graphQLClient.request(USER_PROFILE)
        return res?.getUserProfile
    } catch (error) {
        console.log("from api", error);
        // throw error;
    }
}

export {
    fetchUserProfileApi
}