import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { developmentUrlRestFull } from "../../utils"

const selectToken = (state) => state?.auth?.user?.token;

export const usersServices = createApi({
    reducerPath: "users_services",
    baseQuery: fetchBaseQuery({
        baseUrl: developmentUrlRestFull,
        prepareHeaders: (headers, { getState }) => {
            const token = selectToken(getState())
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["profile"],
    endpoints: (builder) => ({
        // change photo
        uploadAvatar: builder.mutation({
            query: (res) => ({
                url: "/users/profilePhoto",
                method: "PUT",
                body: res,
            }),
            invalidatesTags: ["profile"],
        }),





    }),
});

export const {
    useUploadAvatarMutation,
} = usersServices;
export default usersServices