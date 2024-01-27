import React, { useCallback, useEffect, useRef, useState } from "react";
import { request } from 'graphql-request'
import { useParams, useNavigate } from "react-router-dom"
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


import { BLOG_SEARCH } from "../graphql/mutations";

export const useBlogSearch = () => {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    // query search
    const query = searchParams.get('q');
    // pagination
    const page = parseInt(searchParams.get("page"), 10) || 1;


    const searchBlog = async () => {
        try {
            const res = await GraphQLClient.request(
                BLOG_SEARCH,
                {
                    q: query, page
                }
            )
            return res
        } catch (error) {
            console.log(error);
        }
    }

    const { data, isFetched, isError, error, isLoading } = useQuery({
        queryKey: ["searched_result"],
        queryFn: searchBlog
    })

    useEffect(() => {
        searchBlog();
    }, [isFetched, query, page, searchBlog]);

    return { query, isLoading, data, isError, error };
};