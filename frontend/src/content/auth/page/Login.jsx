import { useForm } from "react-hook-form";
import { InputText } from "../../../components/forms";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useAuthCustomHook";
import { displayToast } from "../../../helpers";

const Login = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const { loginUser, isPending } = useLogin();

    const onSubmit = (data) => {
        loginUser(data, {
            onSuccess: () => {
                reset({
                    data: ""
                })
            }
        });

    };

    return (
        <main className="body-containe min-h-screen flex items-center justify-center">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5 text-center">
                    <b className=" text-[33px] inline-block font-libre-baskerville text-accent ">Welcome back!</b>
                    <h5 className=" text-[16px] leading-[24px] font-open-sans text-pretty text-center mt-2">Sign in to get the most out of Blog.</h5>
                </div>

                <InputText
                    name="email"
                    label="Email or username"
                    shadow="md"
                    shadowColor="gray-100"
                    control={control}
                    rules={{ required: "email or username are required" }}
                    errors={errors}
                />


                <InputText
                    name="password"
                    type="password"
                    label="password"
                    shadow="md"
                    shadowColor="gray-100"
                    control={control}
                    rules={{ required: "Provide your password" }}
                    errors={errors}
                />

                <button type="submit" className="btn w-full btn-accent  mt-5">
                    {isPending ? "Loading..." : "Login"}
                </button>

                <div className="flex justify-between items-center ">
                    <Link className=' font-medium  text-right inline-block pt-1.5'>
                        <span className='label-text capitalize underline'>forgot Password</span>
                    </Link>

                    <Link to="/register" className='text-start font-medium  inline-block pt-1.5'>
                        <span className='label-text capitalize underline'>Not Member yet ?</span>
                    </Link>
                </div>

            </form>
        </main>
    )
};

export default Login;

