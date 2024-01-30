import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { request } from 'graphql-request'
// react-query
import {
    useInfiniteQuery,
    useQueryClient,
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { fetchHomePosts, fetchSimilarPostsApi, fetchSinglePostApi, handleLikeApi, handleViewsApi } from "../apis";
import { FETCH_HOME_POSTS } from "../gql/queries";
import { developmentUrlGraphql } from "../../../utils";
import GraphQLClient from "../../../config/graphqlRequest"
import { useIncrementViewCountMutation } from "../../../redux/services/postsServices";
// *####################################################




// fetch posts
const useFetchHomePosts = () => {

    const queryClient = useQueryClient();
    const queryKey = "posts"
    const LIMIT = 2
    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await GraphQLClient.request(
                FETCH_HOME_POSTS,
                {
                    page: pageParam,
                    pageSize: LIMIT
                }
            );
            return res?.getAllPosts?.posts;
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

// single post
const useFetchSinglePost = () => {
    const { postSlug } = useParams();
    const queryClient = useQueryClient();
    const { data, error, isError, isLoading, isSuccess } = useQuery({
        queryKey: ["posts", postSlug],
        queryFn: () => fetchSinglePostApi(postSlug),
    })


    const hasFetched = useRef(false);
    useEffect(() => {
        if (data && !hasFetched.current) {
            hasFetched.current = true;
        }
    }, [data]);

    // views
    const { mutate: incrementViewCount } = useMutation({
        mutationFn: () => handleViewsApi(postSlug),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts', postSlug] });
            queryClient.invalidateQueries({ queryKey: ['similar_posts', postSlug] });
        },
    });

    // incrementViewCount()
    const [hasViewed, setHasViewed] = useState(false);

    useEffect(() => {
        const markAsViewed = async () => {
            const hasViewedSession = sessionStorage.getItem(`viewed_${postSlug}`);
            if (!hasViewedSession && isSuccess && data) {
                await incrementViewCount(postSlug);
                sessionStorage.setItem(`viewed_${postSlug}`, "true");
                setHasViewed(true);
            }
        };

        markAsViewed();
    }, [isSuccess, data, postSlug, incrementViewCount, hasViewed]);

    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.hasFocus() && !hasViewed && isSuccess && data) {
                await incrementViewCount(postSlug);
                sessionStorage.setItem(`viewed_${postSlug}`, "true");
                setHasViewed(true);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isSuccess, data, postSlug, incrementViewCount, hasViewed]);


    return { data, error, isError, isLoading }
}


// similar posts
const useFetchSimilarPosts = () => {
    const { postSlug } = useParams();
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ["similar_posts", postSlug],
        queryFn: () => fetchSimilarPostsApi(postSlug)

    })

    return { data, error, isError, isLoading }
}


// handle like post
const useHandleLike = () => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (postSlug) => handleLikeApi(postSlug),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["similar_posts"] });
        },
    })
    return { mutate }
}



export {
    useFetchHomePosts,
    useHandleLike,
    useFetchSinglePost,
    useFetchSimilarPosts,
}