import React, { useMemo, useState } from "react";
import { useFetchSinglePost } from "../hooks/usePostsCustomHook";

import Header from "./Header";
import Content from "./Content";
import { Comments } from "../../comments/components";
import SinglePostLoader from "./SinglePostLoader";

const PostDetails = () => {

    const {
        data,
        isLoading,
        singlePostError,
    } = useFetchSinglePost()

    if (isLoading) {
        return <SinglePostLoader cards={1} />
    }

    if (singlePostError) {
        console.log(singlePostError);
        return <div className="text-center text-xl">sorry , {singlePostError} 😓   </div>
    }

    const postData = data?.getSinglePost ?? {}
    return <article>
        {/* HEAD */}
        <Header
            user={postData?.user}
            category={postData?.category}
            date={postData?.createdAt}
        />
        {/* Content */}
        <Content
            {...postData}
        />
        <Comments
            postId={postData?._id}
            commentsNbr={postData?.commentsCount}
        />
    </article>;
};

export default PostDetails;
