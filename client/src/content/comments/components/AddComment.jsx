import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddComment } from "../hooks/useCommentsCustomHook";

const AddComment = ({ commentsNbr, postId }) => {
    const { user } = useSelector(s => s.auth)
    const { handleSubmit, loading } = useAddComment(postId)

    return (
        <div className="mt-20">
            <h3 className="text-base">
                {commentsNbr || 0} {commentsNbr === 0 || commentsNbr === 1 ? "comment" : "comments"}
            </h3>
            <hr className="my-1" />
            <form
                method="POST"
                className="flex justify-between space-x-1"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(e.currentTarget)
                }}
            >
                <input
                    type="text"
                    placeholder="Add a comment..."
                    name="text"
                    className="w-full border-none bg-neutral bg-opacity-5  px-1 h-10" />

                {
                    user ?
                        <button type="submit" className="font-bold text-base">
                            {loading ? "Loading..." : "Comment"}

                        </button>
                        :
                        <Link to="/login" className="font-bold text-base" >
                            Post
                        </Link>
                }
            </form>
        </div>
    )
};

export default AddComment;
