
import { useEffect, useState } from "react";
import { request } from 'graphql-request'
// react-query
import {
    useInfiniteQuery,
    useQueryClient,
    useQuery,
    useMutation,
    QueryClient
} from "@tanstack/react-query";

// helpers
import { getFormValues, displayToast } from "../../../helpers"
import { customFetch, developmentUrlGraphql, developmentUrl } from "../../../utils"

// gql
import GraphQLClient from "../../../config/graphqlRequest"

import {
    USER_PROFILE,
    CHART_VIEWS,
    TOTAL_DATA
} from "../graphql/queries";
import { UPDATE_PROFILE } from '../graphql/mutations';

// restFull
import { uploadProfilePhoto } from '../services';
import { useUploadAvatarMutation } from '../../../redux/services/usersServices';

export const usefetchUserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use useEffect to fetch user profile only once when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GraphQLClient.request(USER_PROFILE);
                setUserData(result);
            } catch (error) {
                if (error.response && error.response.errors && error.response.errors.length > 0) {
                    const errorMessage = error.response.errors[0].msg;
                    console.log(errorMessage);
                    setError(errorMessage);
                } else {
                    console.log(error);
                    setError("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        // Fetch user profile only if it hasn't been fetched before
        if (!userData) {
            fetchData();
        }
    }, [userData]);

    return { userData, isLoading, error };
};

// export const usefetchUserProfile = () => {
//     const { data: userData, isLoading, error } = useQuery({
//         queryKey: ["profile"],
//         queryFn: async () => {
//             try {
//                 const result = await GraphQLClient.request(USER_PROFILE);
//                 return result;
//             } catch (error) {
//                 if (error.response && error.response.errors && error.response.errors.length > 0) {
//                     const errorMessage = error.response.errors[0].msg;
//                     console.log(errorMessage);
//                 } else {
//                     console.log(error);
//                     return { userData: null, isLoading: false, error: "An unknown error occurred." };
//                 }
//             }
//         },
//     });
//     return { userData, isLoading, error };
// };

export const useTotalData = () => {
    const {
        data: totalData,
        isLoading: totalDataLoader,
        error: totalDataError
    } = useQuery({
        queryKey: ["posts_data"],
        queryFn: async () => {
            try {
                const result = await GraphQLClient.request(TOTAL_DATA);
                return result
            } catch (error) {
                console.log(error);
            }
        }
    })

    const customErrors = {
        fetchTotalDataError: totalDataError?.graphQLErrors[0]?.message || null,
        networkError: totalDataError?.networkError?.message || null,
    };

    return { totalData, totalDataLoader, ...customErrors };
};



export const useViewsCharts = () => {
    const {
        data: viewsCharts,
        isLoading: viewsChartsLoader,
        error: viewsChartsError
    } = useQuery({
        queryKey: ["posts_views"],
        queryFn: async () => {
            try {
                const result = await GraphQLClient.request(CHART_VIEWS);
                return result
            } catch (error) {
                console.log(error);
            }
        }
    })

    const customErrors = {
        fetchViewsChartsError: viewsChartsError?.graphQLErrors[0]?.message || null,
        networkError: viewsChartsError?.networkError?.message || null,
    };

    return { viewsCharts, viewsChartsLoader, ...customErrors };
};


export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    const { mutate: updatedProfile } = useMutation({
        mutationFn: async (form) => {
            try {
                const { data } = getFormValues(form);
                const result = await GraphQLClient.request(UPDATE_PROFILE, {
                    ...data
                });
            } catch (error) {
                console.error('Error during profile update:', error);
                displayToast("Something went wrong during profile update", "error");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            // todo: more invalidate
            displayToast(result?.data?.updateProfile?.msg || "Profile updated successfully", "success");
        }
    });

    return { updatedProfile };
};


export const useUpdateProfilePhoto = () => {
    // avatar
    const [avatar, setAvatar] = useState(null);

    var [res, { isLoading: isAvatarLoader, isError, error }] = useUploadAvatarMutation()

    const handleAvatar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', avatar);
        try {
            await res(formData);
            displayToast("Profile photo updated successfully", "success")
        } catch (error) {
            displayToast(error?.data?.msg || "Something went wrong", "error")
            console.error(error);
        }
    };

    return {
        avatar,
        setAvatar,
        handleAvatar,
        isAvatarLoader,
        isError,
        error
    };
};