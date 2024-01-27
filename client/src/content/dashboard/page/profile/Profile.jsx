import { useOutletContext } from "react-router-dom"
import { FormInput, SubmitBtn, TextAreaInput, TextEditor } from "../../../../components";
import UploadAvatar from "./UploadAvatar";
import { useUpdateProfile } from "../../hooks/useDashboardCustomHook";


const Profile = () => {
    // const {
    //     handleSubmit,
    //     updatedProfileRes,
    //     updatedProfileLoader,
    //     updatedProfileError
    // } = useUpdateProfile()

    const {
        updatedProfile
    } = useUpdateProfile()

    const {
        user
    } = useOutletContext()
    const userProfile = user


    // mx - auto md: w - auto 
    return <main className="grid place-content-center mt-1.52 w-full">
        <div>
            <h5 className="text-sm mt-10">PROFILE INFORMATION</h5>
        </div>
        <hr />

        <div className="flex flex-col lg:flex-row lg:space-x-10">
            <UploadAvatar
                profileAvatar={userProfile?.avatar?.url}
            />


            <form className="mt-16 "
                onSubmit={(e) => {
                    e.preventDefault()
                    updatedProfile(e.currentTarget)
                }}
            >
                <div className="md:flex md:space-x-2">
                    <FormInput
                        type="text"
                        label="Display name"
                        name="username"
                        size="sm"
                        holder={`${userProfile?.username}`}
                        defaultValue={userProfile?.username}
                        required
                    />
                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        holder={`${userProfile?.email}`}
                        defaultValue={userProfile?.email}
                        size="sm"
                        required
                    />
                </div>
                <TextAreaInput
                    label="add bio"
                    name="bio"
                    size="sm"
                    defaultValue={userProfile?.bio}
                    holder={`${userProfile?.bio || "Bio"}`}
                />
                <TextEditor
                    type="descriptio"
                    name="description"
                    defaultValue={userProfile?.description}
                    holder={`${userProfile?.description || "about you"}`}
                />

                <SubmitBtn
                    text="Save"
                />
            </form>
        </div>
    </main >;
};

export default Profile;
