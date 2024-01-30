import React from "react";
import { FaThumbsUp, FaComment, FaEye } from '../../../assets/icons';
import img from "../../../assets/images/default.png"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useHandleLike } from "../hooks/usePostsCustomHooks";


const Content = (props) => {
    const { user } = useSelector(state => state.auth)

    const { mutate } = useHandleLike()
    const isLiked = props?.likes?.includes(user?._id);

    return (
        <>
            <div className="">
                <h4 className="my-4">
                    {props?.title}
                </h4>
                <img
                    src={props?.image?.url || img}
                    alt={props?.title}
                    className="w-full h-96 object-cover rounded-lg"
                    loading="lazy"
                />
            </div>

            <div className="flex space-x-2 justify-between my-3">
                <div className="flex space-x-2">
                    {
                        user
                            ? <>
                                <button
                                    className="inline-flex items-center"
                                    onClick={() => mutate(props?.slug)}
                                >
                                    <FaThumbsUp className={`mr-0.5 ${isLiked ? "text-blue-700" : "text-gray-500"}`}
                                    />
                                    {props?.likes?.length || 0}
                                </button>
                            </>
                            : <Link to="/login" className="inline-flex">
                                <FaThumbsUp className={`mr-0.5 ${isLiked ? "text-blue-700" : "text-gray-500"}`}
                                />
                                {props?.likes?.length || 0}
                            </Link>
                    }
                    <div className="flex items-center space-x-2">
                        <FaComment /> <span>{props.commentsCount || 0}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FaEye /> <span>{props?.viewsCount || 0}</span>
                </div>
            </div>

            <hr className="text-black" />

            <p
                className="mt-3 leading-7"
                dangerouslySetInnerHTML={{ __html: props?.content }}
            >
            </p>

            {
                props?.hashtags?.length > 0 && (
                    <div className="border rounded-md p-1 flex flex-wrap space-x-2">
                        {props?.hashtags?.map((h, index) => {
                            return <Link to={`/tags/${encodeURIComponent(h)}`} key={index} className="underline" >#{h}</Link>
                        })}
                    </div>
                )
            }

        </>

    )
};

export default Content;


/* 

import React from "react";
import { FaThumbsUp, FaComment, FaEye } from '@/assets/icons';
import img from "/default.png"
import { formatDate } from "@/utils";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useHandleLike } from "../../hooks/posts/usePosts";

const Content = (props) => {
    const { user } = useSelector(state => state.auth)
    const { handleLikePost } = useHandleLike()
    const isLiked = true
    return (
        <>
            <div className="">
                <h4 className="my-4">
                    {props?.title}
                </h4>
                <img
                    src={props?.image?.url || img}
                    alt={props?.title}
                    className="w-full h-96 object-cover rounded-lg"
                    loading="lazy"
                />
            </div>

            <div className="flex space-x-2 justify-between my-3">
                <div className="flex space-x-2">
                    {
                        user
                            ? <>
                                <button
                                    className="inline-flex items-center"
                                    onClick={() => handleLikePost(props?.slug)}
                                >
                                    <FaThumbsUp className={`mr-0.5 ${isLiked ? "text-blue-700" : "text-gray-500"}`}
                                    />
                                    {props?.likes?.length || 0}
                                </button>
                            </>
                            : <Link to="/login" className="inline-flex">
                                <FaThumbsUp className={`mr-0.5 ${isLiked ? "text-blue-700" : "text-gray-500"}`}
                                />
                                {props?.likes?.length || 0}
                            </Link>
                    }
                    <div className="flex items-center space-x-2">
                        <FaComment /> <span>{props.commentsCount || 0}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FaEye /> <span>{props?.viewsCount || 0}</span>
                </div>
            </div>

            <hr className="text-black" />

            <p
                className="mt-3 leading-7"
                dangerouslySetInnerHTML={{ __html: props?.content }}
            >
            </p>

            {
                props?.hashtags?.length > 0 && (
                    <div className="border rounded-md p-1 flex flex-wrap space-x-2">
                        {props?.hashtags?.map((h, index) => {
                            return <Link key={index} className="underline" >#{h}</Link>
                        })}
                    </div>
                )
            }

        </>

    )
};

export default Content;

*/