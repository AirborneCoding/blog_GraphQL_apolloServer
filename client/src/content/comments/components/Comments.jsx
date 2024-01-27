import { useDeleteComment, useFetchPostComments } from "../hooks/useCommentsCustomHook"
import AddComment from "./AddComment"
import { FaThumbsUp, MdDelete } from "../../../assets/icons";
import { Link, useOutletContext } from "react-router-dom";
import { formatDate } from "../../../utils";
import { useSelector } from "react-redux";

const Comments = ({ postId, commentsNbr }) => {

    const { user } = useSelector(s => s.auth)

    const {
        data,
        loading,
        singlePostError,
        networkError
    } = useFetchPostComments(postId)

    // const { handleDeleteComment, deleteCommentloader } = useDeleteComment(postId)

    if (loading) {
        <div>loading</div>
    }

    const postComments = data?.getPostComments || []
    // console.log(postComments);
    return (
        <article>
            <AddComment postId={postId} commentsNbr={commentsNbr} />

            {
                postComments?.length > 0
                    ? (
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold">
                                All Comments:
                            </h3>
                            {
                                postComments?.map((comment) => {
                                    return (
                                        <div key={comment?._id}>
                                            <div className="chat chat-start">
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                        <Link to={`/profile/${comment?.user?.username}`}>
                                                            <img src={comment?.user?.avatar?.url} loading="lazy" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="chat-header">
                                                    <Link to={`/author/${comment?.user?._id}`} className="hover:underline"> {comment?.user?.username}</Link>
                                                    <time className="text-xs opacity-50 ml-1.5">{formatDate(comment?.createdAt)}</time>
                                                </div>
                                                <div className="chat-bubble">{comment?.text}</div>
                                            </div>
                                            {
                                                user && (
                                                    <div className="flex space-x-2 mt-4">
                                                        {
                                                            user?.username === comment?.user?.username && (
                                                                <span
                                                                    onClick={() => handleDeleteComment(comment?._id)}
                                                                >
                                                                    <MdDelete size={15} className="text-red-500 cursor-pointer" />
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                    : (
                        <h2 className="text-center mt-5 font-bold text-xl">
                            Add first comment 🙂
                        </h2>
                    )
            }
        </article >
    );
};

export default Comments;



/* 
<AddComment postId={postId} commentsNbr={commentsNbr} />

            {
                postComments?.length > 0
                    ? (
                        <div className="mt-8">
                            <h3 className="text-xl font-semibold">
                                All Comments:
                            </h3>
                            {
                                postComments?.map((comment) => {
                                    return (
                                        <div key={comment?._id}>
                                            <div className="chat chat-start">
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                        <Link to={`/profile/${comment?.user?.username}`}>
                                                            <img src={comment?.user?.avatar?.url} loading="lazy" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="chat-header">
                                                    <Link to={`/author/${comment?.user?._id}`} className="hover:underline"> {comment?.user?.username}</Link>
                                                    <time className="text-xs opacity-50 ml-1.5">{formatDate(comment?.createdAt)}</time>
                                                </div>
                                                <div className="chat-bubble">{comment?.text}</div>
                                            </div>
                                            {
                                                user && (
                                                    <div className="flex space-x-2 mt-4">
                                                        {
                                                            user?.username === comment?.user?.username && (
                                                                <span
                                                                    onClick={() => handleDeleteComment(comment?._id)}
                                                                >
                                                                    <MdDelete size={15} className="text-red-500 cursor-pointer" />
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                    : (
                        <h2 className="text-center mt-5 font-bold text-xl">
                            Add first comment 🙂
                        </h2>
                    )
            }
*/