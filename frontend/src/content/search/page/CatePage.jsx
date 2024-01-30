import React from "react";
import { useFetchFilteredPosts } from "../hooks/useSearchCustomHooks";
import { Pagination } from "../../../components";
import CatePosts from "../components/CatePosts";
import PostsLoader from "../components/PostsLoader";

const CatePage = () => {
    window.scrollTo(0, 100);
    const { cate, isLoading, data, isError, error } = useFetchFilteredPosts()

    if (isLoading) {
        return <PostsLoader cards={2} />
    }

    if (isError) {
        return <div>something went wrong...</div>
    }

    const { posts, count, pagination } = data?.getAllPosts ?? {}

    const catePosts = posts ?? []
    const { pageCount, page } = pagination ?? {};

    if (catePosts?.length === 0) {
        return <div>no posts available with <span className="text-accent font-bold underline">{cate}</span></div>
    }

    return (
        <main className="space-y-16 body-container">
            <h3 className="text-xl">
                {catePosts?.length} results related to <span className="text-accent font-bold underline">{cate}</span> category
            </h3>
            <section className="grid lg:grid-cols-2 gap-10">
                {
                    catePosts?.map((p, index) => {
                        return <CatePosts key={index} {...p} />
                    })
                }
            </section>
            <Pagination pageCount={pageCount} page={page} />
        </main>
    )
};

export default CatePage;
