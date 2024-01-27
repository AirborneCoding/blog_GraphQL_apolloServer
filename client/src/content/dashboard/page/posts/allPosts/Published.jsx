import { Link } from "react-router-dom";
import { FaEllipsisH } from "@/assets/icons";
import { Loading } from "@/helpers"
import usePosts from "@/hooks/dashboard/usePosts";
import { formatDate } from "../../../../utils";


const Published = (props) => {
    const {
        deleteLoader,
        handleDeletePost,
        isDropdownOpen,
        toggleDropdown,
    } = usePosts()


    if (deleteLoader) {
        return <Loading />
    }

    const formatedDate = formatDate(props?.createdAt)

    return <div className="border">
        {/* HEADER */}
        <div className="flex justify-between p-1 bg-blog2">
            <div className="flex space-x-3">
                <div>
                    <img
                        src={props?.user?.avatar?.url}
                        alt={props?.user?.username}
                        className="h-10 w-10 rounded-full " 
                        loading="lazy"
                        />
                </div>
                <div className="flex flex-col text-sm">
                    <div className="flex space-x-1">
                        <span className="text-xs">{props?.user?.username}</span>
                        <span>{formatedDate}</span>
                    </div>
                    <Link to={`/posts/search?category=${props?.category?.name}`} className="mt-1 hover:underline">{props?.category?.name}</Link>
                </div>
            </div>
            <div className="relative ">
                <FaEllipsisH onClick={() => toggleDropdown(props._id)} className="cursor-pointer" />
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 border border-gray-300 rounded-lg shadow-lg bg-white" >
                        <ul>
                            <Link to={`/my_profile/edit_post/${props._id}`}>
                                <li className="cursor-pointer hover:bg-sky-100 p-2">Edit the post</li>
                            </Link>
                            <li className="cursor-pointer hover:bg-sky-100 p-2">Go the post</li>
                            <li className="cursor-pointer hover:bg-sky-100 p-2">Add to archives</li>
                            <li onClick={() => handleDeletePost(props._id)} className="cursor-pointer text-white bg-red-500 p-2">Delete</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>

        {/* Content */}
        <div className="mt-3">
            <Link to={`/posts/${props._id}`} >
                <h2 className="text-xl px-1 my-2 hover:underline" >{props?.title}</h2>
            </Link>
            <figure>
                <img
                    src={props?.image?.url}
                    alt={props?.title}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                />
            </figure>
        </div>

        <div className="flex justify-between space-x-2 px-1 pb-1 mt-2">
            <div>
                <span>{props?.likes?.length} Likes</span>
                {/* <span>{props?.commentsCount} comments</span>
                <span>{props?.sharesCount} shares</span> */}
            </div>
            <span>{props?.viewsCount} views </span>
        </div>
    </div>
};

export default Published;
