import { FaEdit } from "../../../../assets/icons";
import { useUpdateProfilePhoto } from "../../hooks/useDashboardCustomHook";

const UploadAvatar = ({ profileAvatar }) => {
    const {
        avatar,
        setAvatar,
        handleAvatar,
        isAvatarLoader,
        isError,
        error
    } = useUpdateProfilePhoto()

    return <form className="mt-8 lg:mt-24 flex items-start space-x-7 border-b-2 lg:border-r-2 lg:pr-5 lg:border-b-0" >
        {
            avatar ?
                <div className="relative">
                    <label htmlFor="avatar">
                        <img
                            src={URL.createObjectURL(avatar)}
                            alt="profile-image"
                            className="person-img"
                            loading="lazy"
                        />
                        <button
                            type="submit"
                            onClick={handleAvatar}
                            className="font-bold absolute bottom-5 right-0 bg-myOrange text-white px-2 py-1 rounded-full bg-gray-800 p-2"
                        >
                            {isAvatarLoader ? "loading..." : "Save"}
                        </button>
                        <input
                            accept="image/*"
                            type="file"
                            id="avatar"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            className="hidden"
                            name="avatar"
                        />
                    </label>
                </div>
                :
                <div className="relative">
                    <label htmlFor="avatar">
                        <img
                            src={profileAvatar}
                            alt="profile-image"
                            className="person-img"
                            loading="lazy"
                        />
                        <button
                            type="button"
                            className="font-bold absolute bottom-5 right-0 bg-myOrange text-myBlue px-2 py-1 rounded-full"
                        >
                            <FaEdit size={20} />
                        </button>
                        <input
                            accept="image/*"
                            type="file"
                            id="avatar"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            className="hidden"
                            name="avatar"
                        />
                    </label>
                </div>
        }
    </form>

};

export default UploadAvatar;
