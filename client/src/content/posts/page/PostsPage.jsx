import React from "react";
import { useFetchHomePosts } from "../hooks/usePostsCustomHook";
import PostsLoader from "../components/PostsLoader";
import PostsCard from "../components/PostsCard";

const PostsPage = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        isFetchingNextPage,
        fetchNextPage,
        ref,
        hasNextPage,
    } = useFetchHomePosts()

    if (isLoading) {
        return <PostsLoader cards={4} />
    }
    if (isError) {
        return <p style={{ marginTop: '1rem ' }}>There was an error...</p>;
    }

    const _posts = data?.pages?.flatMap((page) => page);

    if (_posts.length === 0) {
        return <div>No posts available</div>
    }


    return (
        <section className="space-y-16 body-container">
            <article className="space-y-16" >
                {_posts?.map((post, i) => (
                    <React.Fragment key={post._id}>
                        <PostsCard  {...post} />
                        {i === _posts.length - 1 && <div ref={ref}></div>}
                    </React.Fragment>
                ))}
            </article>
            {isFetchingNextPage
                ? <PostsLoader cards={2} style={{ margin: '1rem' }} />
                : hasNextPage
            }
        </section>
    );
};

export default PostsPage;
