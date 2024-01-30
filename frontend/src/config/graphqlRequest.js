import { GraphQLClient } from 'graphql-request'
import { developmentUrlGraphql } from "../utils"


const getUserToken = () => {
    const user = JSON.parse(localStorage.getItem('01-BLOG_USER')) || null;
    return user?.token || '';
};

/* const token = getUserToken();

const graphQLClient = new GraphQLClient(developmentUrlGraphql, {
    headers: {
        authorization: `Bearer ${getUserToken()}`,
    },
})
// graphQLClient.setHeader('authorization', `Bearer ${token}`);


export default graphQLClient */





const graphQLClient = new GraphQLClient(developmentUrlGraphql, {
    headers: {
        authorization: `Bearer ${getUserToken()}`,
    },
});
export default graphQLClient;
