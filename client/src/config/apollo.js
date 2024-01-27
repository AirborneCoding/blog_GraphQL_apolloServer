import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { customFetch, developmentUrlGraphql } from "../utils"

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("01-BLOG_USER")) || null
}

const httpLink = createHttpLink({
    uri: developmentUrlGraphql,
});


const authLink = setContext((_, { headers }) => {
    const user = getUserFromLocalStorage()
    return {
        headers: {
            ...headers,
            authorization: user?.token ? `Bearer ${user?.token}` : "",
        }
    }
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


export default client