import { request } from 'graphql-request'
import { useLocation, useParams } from "react-router-dom"
// react-query
import {
    useQueryClient,
    useQuery,
} from "@tanstack/react-query";

// helpers
import { developmentUrlGraphql } from "../../../utils"

// gql
import GraphQLClient from "../../../config/graphqlRequest"
import {
    AUTHOR_PROFILE,
    AUTHOR_POSTS,
    TOP5_AUTHORS
} from "../graphql/queries";


// fetch author profile
export const useFetchAuthorProfile = () => {
    const { authorName } = useParams()

    const fetchAuthor = async () => {
        try {
            const res = await GraphQLClient.request(
                AUTHOR_PROFILE,
                { authorName }
            )
            return res
        } catch (error) {
            console.log(error);
        }
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["author_profile"],
        queryFn: fetchAuthor
    })

    return { data, isLoading, isError, error }
}

// fetch author profile
export const useFetchAuthorPosts = () => {
    const { authorName } = useParams();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const page = parseInt(searchParams.get("page"));

    const fetchAuthorPosts = async () => {
        try {
            const res = await GraphQLClient.request(
                AUTHOR_POSTS,
                { authorName, page: page }
            );
            return res;
        } catch (error) {
            console.error(error);
            throw error; // Make sure to rethrow the error so React Query can handle it
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['author_posts', { authorName, page }],
        queryFn: fetchAuthorPosts,
        // Add other options as needed
    });

    return { data, isLoading, isError, error };
};