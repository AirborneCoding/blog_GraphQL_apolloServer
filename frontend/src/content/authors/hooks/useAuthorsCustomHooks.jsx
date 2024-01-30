import {
    useInfiniteQuery,
    useQueryClient,
    useQuery,
    useMutation,
    QueryClient
} from "@tanstack/react-query";
import { AUTHOR_POSTS, AUTHOR_PROFILE } from "../gql/queries";

import GraphQLClient from "../../../config/graphqlRequest"
import { useEffect, useState } from "react";
import { fetchTop5AuthorsAPI } from "../apis";
import { useParams, useLocation } from "react-router-dom"

// *################################################################

const fetchTop5authors = () => {

    const { data, error, isError, isLoading } = useQuery({
        queryKey: ["authors"],
        queryFn: fetchTop5AuthorsAPI
    })

    return { data, error, isError, isLoading }

}

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


export {
    fetchTop5authors
}
