
import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { FormInput, ModalForDelete, SubmitBtn, Loading } from "@/helpers";
import { FaTrash } from "@/assets/icons";
import { useChangePassword, useDeleteProfile } from "../../../hooks/auth/useAuth";

const Settings = () => {
    const { user } = useOutletContext()

    const {
        loading,
        error,
        data,
        handleSubmit,
    } = useChangePassword()

    const {
        deleteProfileLoader,
        deleteProfileError,
        handleDelete,
    } = useDeleteProfile()


    const [Modal, setModal] = useState(false)

    const handleOpen = () => {
        setModal(true)
    }
    const handleClose = () => {
        setModal(false)
    }


    if (deleteProfileLoader || loading) {
        return <Loading />
    }

    return <main className="grid place-content-center mt-16">
        <div>
            <h2 className="text-xl">Account settings</h2>
            <h5 className="text-sm mt-10">ACCOUNT PREFERENCES</h5>
        </div>
        <hr />

        <form className="mt-16 lg:w-[800px] md:w-[600px] w-80" onSubmit={handleSubmit} >
            <FormInput
                type="text"
                label="old Password :"
                name="oldPassword"
            />
            <FormInput
                type="password"
                label="new Password :"
                name="newPassword"
            />
            <SubmitBtn
                text="change"
            />
        </form>

        <div className="mt-20" >
            <button
                onClick={handleOpen}
                className="btn-nc bg-red-500 btn-md text-md btn-error hover:bg-red-600 hover:text-white text-start">
                <div className="flex items-center space-x-1">
                    <FaTrash size={20} />
                    <span className="hidden md:inline">delete my account</span>
                </div>
            </button>

            <ModalForDelete
                Modal={Modal}
                handleClose={handleClose}
                action={handleDelete}
                username={user?.username}
            />

        </div>

    </main>;
};

export default Settings;
