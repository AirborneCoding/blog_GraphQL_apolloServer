import React, { useState } from "react";
import { SelectInput, Pagination } from "@/helpers";
import Published from "./Published";
import Archived from "./Archived";
import usePosts from "@/hooks/dashboard/usePosts";
import { Loading } from "@/helpers";

const AllPosts = () => {
    const {
        myPosts,
        myPostsLoder,
        isMyPostsError,
        myPostsError,
        handleSortChange,
        handleComponentChange,
        activeComponent,
        setActiveComponent,
    } = usePosts()


    if (myPostsLoder) {
        return <Loading />;
    }

    const { allTotalPosts, count, posts, pagination } = myPosts ?? {};
    const { pageSize, pageCount, page } = pagination ?? {};

    return (
        <main className=" mt-2">
            <h2 className="text-xl">My Posts</h2>
            <hr className="mb-16 mt-3" />

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between bg-blog2 p-4">
                <div className="flex items-center space-x-4">
                    <h2 className="font-medium text-md">
                        {allTotalPosts || 0} Article{allTotalPosts > 1 && "s"}
                    </h2>
                    <div className="space-x-2 bg-blog text-white p-1 rounded-lg w-full text-center md:w-auto">
                        <button
                            className={`${activeComponent === "published"
                                ? "bg-slate-500 font-bold rounded-lg p-2"
                                : ""
                                }`}
                            onClick={() => handleComponentChange("published")}
                        >
                            Published
                        </button>
                        <button
                            className={`${activeComponent === "archived"
                                ? "bg-slate-500 font-bold rounded-lg p-2"
                                : ""
                                }`}
                            onClick={() => handleComponentChange("archived")}
                        >
                            Archives
                        </button>
                    </div>
                </div>
                <form className="mb-4">
                    <SelectInput
                        list={["a-z", "z-a", "most-liked", "most-commented", "most-viewed", "more-shared"]}
                        name="sort"
                        size="md"
                        onChange={handleSortChange}
                    />
                </form>
            </div><hr />

            {/* Display active component */}
            {activeComponent === "published" ? (
                <section>
                    <h2 className="text-xl mb-10 mt-5">{count || 0} published articles</h2>
                    <article className="grid grid-cols-1 md:grid-cols-2 xl:md:grid-cols-3 gap-y-10 gap-x-8">
                        {posts?.map((post) => (
                            <Published key={post._id} {...post} />
                        ))}
                    </article>

                    <Pagination pageCount={pageCount} page={page} />
                </section>
            ) : (
                <section>
                    <h2 className="text-xl mb-10 mt-5">{count || 0} archived articles</h2>
                    <article className="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 xl:md:grid-cols-4 gap-y-10 gap-x-8">
                        {posts?.map((post) => (
                            <Archived key={post._id} {...post} />
                        ))}
                    </article>

                    <Pagination pageCount={pageCount} page={page} />
                </section>
            )}
        </main>
    );
};

export default AllPosts;