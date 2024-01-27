import { request } from 'graphql-request'
// react-query
import {
    useQueryClient,
    useQuery,
    useMutation,
} from "@tanstack/react-query";

// helpers
import { getFormValues } from "../../../helpers"
import { developmentUrlGraphql } from "../../../utils"

// gql
import GraphQLClient from "../../../config/graphqlRequest"
import {
    FETCH_POST_COMMENTS
} from "../graphql/queries";
import {
    ADD_COMMENT,
    DELETE_COMMENT
} from "../graphql/mutations";


export const useFetchPostComments = (postId) => {
    const { data, isLoading: loading, error } = useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            try {
                const result = await request(
                    developmentUrlGraphql,
                    FETCH_POST_COMMENTS,
                    {
                        postSlug: postId,
                    }
                );
                // console.log(result);
                return result
            } catch (error) {
                // console.error("Error in useFetchPostComments:", error);
                return {};

            }
        },
    });

    const customErrors = {
        postCommentsError: error?.graphQLErrors[0]?.msg || null,
        networkError: error?.networkError?.message || null,
    };

    return { loading, data, ...customErrors };
};


export const useAddComment = (postId) => {

    const queryClient = useQueryClient();

    const { mutate: handleSubmit, isPending: loading } = useMutation({
        mutationFn: async (form) => {
            const { data } = getFormValues(form);
            try {
                await GraphQLClient.request(ADD_COMMENT, {
                    postId: postId, text: data.text
                });

            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        }
    })

    return { handleSubmit, loading }
};



export const useDeleteComment = () => {

    const queryClient = useQueryClient();

    const { mutate: handleDeleteComment, isPending: deleteCommentloader } = useMutation({
        mutationFn: async (postId) => {
            const { data } = getFormValues(form);
            try {

                const result = await GraphQLClient.request(DELETE_COMMENT, {
                    postId, text: data.text
                });

            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        }
    })

    return { handleDeleteComment, deleteCommentloader }

};