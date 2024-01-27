import React from "react";
import { CheckboxInput, FormInput, SubmitBtn } from "../../../components";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useAuthCustomHook";


const Login = () => {

    const {
        loading,
        error,
        data,
        handleLogin,
    } = useLogin();

    return (
        <>
            <main className="body-containe min-h-screen flex items-center justify-center">


                <form onSubmit={handleLogin}>
                    <div className="mb-5 text-center">
                        <b className=" text-[33px] inline-block font-libre-baskerville text-black ">Welcome back!</b>
                        <h5 className=" text-[16px] leading-[24px] font-open-sans text-black text-center mt-2">Sign in to get the most out of nuntium.</h5>
                    </div>

                    <FormInput
                        name="email"
                        type="text"
                        required={true}
                        holder="Email, username"
                        shadow="md"
                        shadowColor="gray-100"
                    />
                    <FormInput
                        name="password"
                        type="password"
                        required={true}
                        holder="password"
                        shadow="md"
                        shadowColor="gray-100"
                    />
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-[12px] font-medium  text-right inline-block w-[108px] h-[17px]">
                            <CheckboxInput
                                label="Remembr me"
                            />
                        </div>
                        <Link className=' font-medium  text-right inline-block pt-1.5'>
                            <span className='label-text capitalize underline'>forgot Password</span>
                        </Link>
                    </div>
                    <div className="mt-8">
                        <SubmitBtn
                            type="submit"
                            text={`${loading ? "Loading..." : "Login"}`}
                        />
                    </div>
                    <Link to="/register" className='text-start font-medium  inline-block pt-1.5'>
                        <span className='label-text capitalize underline'>Not Member yet ?</span>
                    </Link>
                </form>
            </main>
        </>
    )
};

export default Login;

