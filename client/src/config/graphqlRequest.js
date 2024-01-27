import { request, GraphQLClient } from 'graphql-request'
import { customFetch, developmentUrlGraphql } from "../utils"


const getUserToken = () => {
    const user = JSON.parse(localStorage.getItem('01-BLOG_USER')) || null;
    return user?.token || '';
};

const token = getUserToken();



const graphQLClient = new GraphQLClient(developmentUrlGraphql, {
    headers: {
        authorization: `Bearer ${token}`,
    },
})
// graphQLClient.setHeader('authorization', `Bearer ${token}`);


export default graphQLClient




/* 
const graphQLClient = new GraphQLClient(developmentUrl, {
    fetch: customFetch("/graphql"), // Use customFetch as the fetch function
    headers: {
        authorization: `Bearer ${getUserToken()}`,
    },
});
export default graphQLClient;
*/