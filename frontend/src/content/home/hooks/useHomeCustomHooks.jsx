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
import { useIntersection } from "@mantine/hooks";
import { fetchHomePosts, fetchTop5AuthorsAPI, fetchTop5_C_H_API, handleLikeApi } from "../Apis";

const useFetchHomePosts = () => {

    const queryClient = useQueryClient();

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: ({ pageParam = 1 }) => {
            fetchHomePosts(pageParam, 2)
        },

        getNextPageParam: (_, pages) => {
            return pages?.length + 1;
        },

    })

    const lastPostRef = useRef(null);
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry, hasNextPage, fetchNextPage]);

    useEffect(() => {
        if (data) {
            queryClient.setQueryData([queryKey], data);
        }
    }, [data, queryClient, queryKey]);

    useEffect(() => {
        return () => {
            queryClient.removeQueries([queryKey]);
        };
    }, [queryClient, queryKey]);

    return {
        data,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        fetchNextPage,
        ref,
        hasNextPage,
    }
}

const fetchTop5authors = () => {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ["authors"],
        queryFn: fetchTop5AuthorsAPI
    })
    return { data, error, isError, isLoading }
}

const fetchTop5_C_H = () => {
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ["cate_hash"],
        queryFn: fetchTop5_C_H_API
    })
    return { data, error, isError, isLoading }
}

const handleLike = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (postSlug) => handleLikeApi(postSlug),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    })
    return { mutate }
}


export {
    useFetchHomePosts,
    fetchTop5authors,
    fetchTop5_C_H,
    handleLike
}