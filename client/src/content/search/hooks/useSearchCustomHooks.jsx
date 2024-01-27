import React, { useCallback, useEffect, useRef, useState } from "react";
import { request } from 'graphql-request'
import { useParams, useNavigate, useLocation } from "react-router-dom"
// react-query
import {
    useInfiniteQuery,
    useQueryClient,
    useQuery,
    useMutation,
} from "@tanstack/react-query";

// helpers
import { getFormValues } from "../../../helpers"
import { customFetch, developmentUrlGraphql, developmentUrl } from "../../../utils"

// gql
import GraphQLClient from "../../../config/graphqlRequest"


import {
    BLOG_SEARCH,
    FETCH_FILTRED_POSTS,
    // FETCH_FILTRED_POSTS
} from "../graphql/queries";



export const useBlogSearch = () => {
    const { search } = useLocation();

    // Pagination
    const searchParams = new URLSearchParams(search);
    const page = parseInt(searchParams.get('page')) || 1;

    // Query search
    const query = searchParams.get('q');

    const queryClient = useQueryClient();

    const searchBlog = async () => {
        try {
            const res = await GraphQLClient.request(BLOG_SEARCH, {
                q: query,
                page,
            });
            return res;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['searched_result', { query, page }],
        queryFn: searchBlog,
        refetchOnWindowFocus: false,
    });

    // Invalidate queries when the search query or page changes
    useEffect(() => {
        queryClient.invalidateQueries(['searched_result', { query, page }]);
    }, [query, page, queryClient]);

    return { query, page, isLoading, data, isError, error };
};


export const useFetchFilteredPosts = () => {

    const { tag, cate } = useParams()

    // pagination
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page'), 10) || 1;

    const queryClient = useQueryClient();

    if (tag) {
        const searchTag = async () => {
            try {
                const res = await GraphQLClient.request(
                    FETCH_FILTRED_POSTS,
                    {
                        hashtags: tag,
                        page,
                    });
                return res;
            } catch (error) {
                console.log(error);
                throw error;
            }
        };

        const { data, isError, isLoading, error } = useQuery({
            queryKey: ['posts', { tag, page }],
            queryFn: searchTag,
            refetchOnWindowFocus: false,
        });
        useEffect(() => {
            queryClient.invalidateQueries(['posts', { tag, page }]);
        }, [tag, page, queryClient]);

        return { tag, isLoading, data, isError, error };
    }
    if (cate) {
        const searchCat = async () => {
            try {
                const res = await GraphQLClient.request(
                    FETCH_FILTRED_POSTS,
                    {
                        category: cate,
                        page,
                    });
                return res;
            } catch (error) {
                console.log(error);
                throw error;
            }
        };

        const { data, isError, isLoading, error } = useQuery({
            queryKey: ['posts', { cate, page }],
            queryFn: searchCat,
            refetchOnWindowFocus: false,
        });
        useEffect(() => {
            queryClient.invalidateQueries(['posts', { cate, page }]);
        }, [cate, page, queryClient]);

        return { cate, isLoading, data, isError, error };
    }
};