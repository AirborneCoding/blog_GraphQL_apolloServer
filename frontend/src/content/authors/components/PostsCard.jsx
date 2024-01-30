import { formatDate } from "../../../utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useHandleLike } from "../../posts/hooks/usePostsCustomHook";
import { FaComment, FaEye } from "react-icons/fa";

const PostsCard = (props) => {
    const { user } = useSelector(s => s.auth)

    const {
        _id, title, slug, category,
        viewsCount, commentsCount,
        createdAt, likes, image,
    } = props
    // const { handleLikePost } = useHandleLike()
    // const isLiked = likes?.includes(user?._id);
    const isLiked = true
    return (
        <div className="">
            <h5 className="text-xs mt-5 -mb-3 lg:-mb-0">
                {formatDate(createdAt)}
            </h5>
            {/* content */}
            <div className="flex flex-col-reverse lg:flex-row justify-between lg:space-x-5 space-x-0 space-y-5 lg:space-y-0 ">
                <div className="flex-grow">
                    <Link to={`/posts/${slug}`}>
                        <h2 className="text-xl hover:underline font-black">
                            {title}
                        </h2>
                    </Link>
                    <div className="flex items-center justify-between space-x-2">
                        <h4 className="text-sm bg-secondary-content rounded-md p-1 hover:underline">
                            <Link to={`/search?q=${encodeURIComponent(category)}`} >
                                {category}
                            </Link>
                        </h4>
                        <div className="flex items-center space-x-1">
                            {
                                user
                                    ? <button
                                        // onClick={() => handleLikePost(props?.slug)}
                                        className={`btn btn-xs ${isLiked && " bg-blue-500"}`}
                                    >
                                        Like {likes?.length}
                                    </button>
                                    : <Link to="/login"
                                        className="btn btn-xs"
                                    >
                                        Like {likes?.length}
                                    </Link>
                            }
                            <div className="flex items-center btn btn-xs">
                                <FaComment size={13} /> <span>{commentsCount || 0}</span>
                            </div>
                            <div className="flex items-center btn btn-xs">
                                <FaEye size={13} /> <span>{viewsCount || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <figure className=" lg:mt-0 lg:w-1/3 flex-shrink-0 lg:pl-2 pb-5 lg:pb-0">
                    <Link to={`/posts/${slug}`}>
                        <img
                            loading="lazy"
                            src={image?.url}
                            className="w-full lg:h-[200px] h-56 object-cover"
                        />
                    </Link>
                </figure>
            </div>
            <br />
            <hr />
        </div>
    )
};

export default PostsCard;
