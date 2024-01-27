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

// helpers
import { getFormValues } from "../../../helpers"
import { customFetch, developmentUrlGraphql, developmentUrl } from "../../../utils"

// gql
import GraphQLClient from "../../../config/graphqlRequest"
import {
    FETCH_HOME_POSTS,
    FETCH_SIMILAR_POST,
    FETCH_SINGLE_POST
} from "../graphql/queries";

import { HANDLE_LIKE, HANDLE_VIEWS } from "../graphql/mutations";

// rtk
import { useAddPostMutation, useIncrementViewCountMutation } from "../../../redux/services/postsServices"

export const useFetchHomePosts = () => {
    const LIMIT = 2;
    const queryKey = "posts";

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
        queryKey: [queryKey],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await request(
                developmentUrlGraphql,
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
        // Optionally, use a delay to avoid frequent triggers
        // delay: 1000,
    });

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            // Optionally, add a check to avoid triggering too frequently
            // if (!isFetchingNextPage) {
            fetchNextPage();
            // }
        }
    }, [entry, hasNextPage, fetchNextPage]);

    useEffect(() => {
        // Cache the initial data
        if (data) {
            queryClient.setQueryData([queryKey], data);
        }
    }, [data, queryClient, queryKey]);

    useEffect(() => {
        // Clean up cache after unmounting
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

// add post
export const useAddPost = () => {
    const [addPost, { isLoading: postLoader }] = useAddPostMutation();
    const navigate = useNavigate();

    const [isFormValid, setIsFormValid] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const postStatus = formData.get("postStatus");
        try {
            await addPost(formData).unwrap();
            displayToast("Pots created", "success")
            if (postStatus === "archived") {
                navigate('/my_profile/my_posts')
            } else {
                navigate('/')
            }
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            console.error(error);

        }
    };

    const handleInputChange = (e) => {
        const form = e.currentTarget;
        setIsFormValid(form.checkValidity());
    };


    return {
        onSubmit,
        isFormValid,
        postLoader,
        handleInputChange
    };
};


export const useFetchSinglePost = () => {
    const { postSlug } = useParams();
    const queryClient = useQueryClient();

    var { data, isLoading, error, isSuccess } = useQuery({
        queryKey: ["single_posts", { postSlug }],
        queryFn: async () => {
            try {
                const result = await request(
                    developmentUrlGraphql,
                    FETCH_SINGLE_POST,
                    {
                        postSlug,
                    }
                );
                return result;
            } catch (error) {
                console.log(error);
            }
        },
    });

    const customErrors = {
        singlePostError: error?.graphQLErrors[0]?.message || null,
        networkError: error?.networkError?.message || null,
    };


    // views


    return { isLoading, data, ...customErrors };
};





export const useFetchSimilarPost = () => {
    const { postSlug } = useParams()
    const { data, isLoading: loading, error } = useQuery({
        queryKey: ["similar_posts", , { postSlug }],
        queryFn: async () => {
            try {
                const result = await request(
                    developmentUrlGraphql,
                    FETCH_SIMILAR_POST,
                    {
                        postSlug,
                    })
                return result
            } catch (error) {
                console.log(error);
            }
        }
    })

    const customErrors = {
        similarPostsError: error?.graphQLErrors[0]?.msg || null,
        networkError: error?.networkError?.message || null,
    };

    return { loading, data, ...customErrors };

};



// Custom hook for fetching post comments
export const useHandleLike = () => {
    const queryClient = useQueryClient();

    const handleLikePost = useCallback(async (postSlug) => {
        const variables = {
            postSlug,
        };

        try {
            await GraphQLClient.request(HANDLE_LIKE, variables);
        } catch (error) {
            console.error('GraphQL request failed:', error);
            throw new Error('Failed to handle like');
        }
    }, [queryClient]);

    const { mutate } = useMutation({
        mutationFn: handleLikePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["single_posts"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["author_posts"] });
        },
    });

    return { handleLikePost: mutate };
};









/* export const useFetchHomePosts = () => {
    const LIMIT = 4;
    const queryKey = "posts";

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
        queryKey: [queryKey],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await request(
                developmentUrlGraphql,
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
        if (entry?.isIntersecting) fetchNextPage();
    }, [entry]);

    useEffect(() => {
        // Cache the initial data
        if (data) {
            queryClient.setQueryData([queryKey], data);
        }
    }, [data, queryClient, queryKey]);

    useEffect(() => {
        // Clean up cache after unmounting
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
 */