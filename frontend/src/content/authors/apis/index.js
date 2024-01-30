import GraphQLClient from "../../../config/graphqlRequest"
import { developmentUrlGraphql } from "../../../utils";
import { TOP5_AUTHORS } from "../gql/queries";
import { request } from 'graphql-request'

// //*################################

const fetchTop5AuthorsAPI = async () => {
    try {
        await GraphQLClient.request(TOP5_AUTHORS)
    } catch (error) {
        console.log("from api", error);
    }
}



export {
    fetchTop5AuthorsAPI
}