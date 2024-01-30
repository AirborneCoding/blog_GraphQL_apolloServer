import graphQLClient from "../../../config/graphqlRequest";
import { LOGIN } from "../graphql/mutations";

const loginUserApi = async (data) => {
    const res = await graphQLClient.request(LOGIN, { ...data })
    return res
}


export { loginUserApi }