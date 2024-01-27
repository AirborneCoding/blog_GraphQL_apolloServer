import { useMutation } from "@apollo/client"
import { useNavigate } from 'react-router-dom';
import { displayToast } from "../../../helpers"
import { LOGIN } from "../graphql/mutations";
import { getFormValues } from '../../../helpers';
import { useDispatch } from 'react-redux';
import { login } from "../../../redux/slices/authSlice";


export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginUser, { loading, error, data }] = useMutation(LOGIN)


    const handleLogin = async (e) => {
        e.preventDefault()

        const { data } = getFormValues(e.currentTarget)
        e.currentTarget?.reset()

        try {
            const result = await loginUser({
                variables: data
            })

            dispatch(login(result));

            displayToast(result?.data?.login?.msg || "Welcome back", "success")
            navigate('/');
        } catch (error) {
            console.log(error);
            error?.graphQLErrors.map((err) => displayToast(err?.msg || "Something went wrong", "error"))
        }
    };

    return {
        loading,
        error,
        data,
        handleLogin,
    };
};
