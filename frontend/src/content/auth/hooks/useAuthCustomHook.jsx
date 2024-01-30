import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from 'react-router-dom';
import { displayToast } from "../../../helpers"
import { LOGIN } from "../graphql/mutations";
import { getFormValues } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { login } from "../../../redux/slices/authSlice";
import { loginUserApi } from "../apis";
import toast from 'react-hot-toast';

export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: loginUser, isError, error, isPending } = useMutation({
        queryKey: ["loginUser"],
        mutationFn: (data) => loginUserApi(data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['loginUser'] });
            dispatch(login(res?.login?.user));

            displayToast(res?.login?.msg || "Welcome back", "success")
            location.reload()
            navigate('/');
        },
        onError: (error) => {
            error?.response?.errors?.map((err) => displayToast(err?.message || "Something went wrong", "error"))
}
    })
return { loginUser, error, isError, isPending }

};
