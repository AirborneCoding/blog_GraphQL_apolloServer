import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { developmentUrlRestFull } from "../../utils";

// Select the authentication token from the state
const selectToken = (state) => state?.auth?.user?.token;
;
// Create the posts API slice
export const postsServices = createApi({
    reducerPath: "posts_services",
    baseQuery: fetchBaseQuery({
        baseUrl: developmentUrlRestFull,
        prepareHeaders: (headers, { getState, method }) => {
            const token = selectToken(getState());
            // Set the Authorization header if a token is available
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            // Additional headers for specific HTTP methods or content types
            if (
                (method === 'POST' || method === 'PATCH' || method === 'PUT') &&
                headers.get('Content-Type') === 'multipart/form-data'
            ) {
                headers.set('Custom-Header', 'custom-value');
            }

            return headers;
        },

    }),
    tagTypes: ["Posts"],
    endpoints: (builder) => ({

        // Add a post
        addPost: builder.mutation({
            query: (body) => ({
                url: "/posts",
                method: "POST",
                body,
                formData: true,
            }),
            invalidatesTags: ["Posts"],
        }),
        // Edit a post
        editPost: builder.mutation({
            query: ({ body, id }) => ({
                url: `/posts/${id}`,
                method: "PATCH",
                body: body,
                formData: true,
            }),
            invalidatesTags: ["Posts"],
        }),

        // Handle like
        handleLike: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["posts", "similar_posts"],
        }),

        // Increment views
        incrementViewCount: builder.mutation({
            query: (postSlug) => ({
                url: `posts/views/${postSlug}`,
                method: 'PUT',
                invalidatesTags: ["single_post"],
            }),
        }),
    }),
});


export const {
    useAddPostMutation,
    useHandleLikeMutation,
    useIncrementViewCountMutation,
    useEditPostMutation
} = postsServices;
export default postsServices;