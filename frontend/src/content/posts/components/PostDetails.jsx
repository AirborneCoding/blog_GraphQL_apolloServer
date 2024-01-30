import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Content from "./Content";
// import { Comments } from "../../comments/components";
import SinglePostLoader from "./SinglePostLoader";
import { useFetchSinglePost } from "../hooks/usePostsCustomHooks";

const PostDetails = () => {
    window.scrollTo(0, 100)
    const navigate = useNavigate()
    const {
        data,
        error,
        isLoading,
        isError
    } = useFetchSinglePost()


    if (isLoading) {
        return <SinglePostLoader cards={1} />
    }

    if (!data) {
        console.log("here", error);
        return navigate("/")
    }

   

    return <article>
        {/* HEAD */}
        <Header
            user={data?.user}
            category={data?.category}
            date={data?.createdAt}
        />
        {/* Content */}
        <Content
            {...data}
        />
        {/* <Comments
            postId={data?._id}
            commentsNbr={data?.commentsCount}
        /> */}
    </article>;
};

export default PostDetails;
