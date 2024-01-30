import { useFetchHomePosts } from "../hooks/usePostsCustomHooks";
import PostsLoader from "../components/PostsLoader";
import PostsCard from "../components/PostsCard";
import React, { lazy, Suspense } from "react";
// const PostsCard = lazy(() => import('../components/PostsCard'));

const HomePosts = () => {
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
        console.log(error);
        return <p style={{ marginTop: '1rem ' }}>There was an error...</p>;
    }

    const _posts = data?.pages?.flatMap((page) => page);

    if (_posts?.length === 0) {
        return <div>No posts available</div>
    }


    return (
        <>
            {/* <Suspense fallback={<PostsLoader cards={4} />}>
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
            </Suspense> */}
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
        </>
    )
};

export default HomePosts;
