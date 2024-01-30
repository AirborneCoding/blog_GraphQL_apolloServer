import {
    useInfiniteQuery,
    useQueryClient,
    useQuery,
    useMutation,
    QueryClient
} from "@tanstack/react-query";
import { USER_PROFILE } from "../gql/queries";

import GraphQLClient from "../../../config/graphqlRequest"
import { useEffect, useState } from "react";
import { fetchUserProfileApi } from "../apis";
import { useSelector } from "react-redux"
import graphQLClient from "../../../config/graphqlRequest";

export const usefetchUserProfile = () => {
    const { data: userData, error, isError, isLoading, isFetched } = useQuery({
        queryKey: [],
        queryFn: fetchUserProfileApi,
    });

    useEffect(() => {
        fetchUserProfileApi();
    }, []);

    // useEffect(() => { location.reload(); }, [isFetched])

    return { userData, isLoading, error, isError };
};