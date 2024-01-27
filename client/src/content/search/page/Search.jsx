import React from "react";
import { Loading, Pagination } from "../../../components"
import { useBlogSearch } from "../hooks/useSearchCustomHooks";
import AuthorsSearch from "../components/AuthorsSearch";
import PostsSearch from "../components/PostsSearch";

const Search = () => {
    window.scrollTo(0, 100)

    const { query, isLoading, data, isError, error } = useBlogSearch();


    if (isLoading) return <Loading />;
    if (isError) return <p>something went wrong</p>;


    // const results = data?.blogSearch ?? {};
    // const { pageCount, page } = results?.pagination ?? {};

    // console.log(results);

    const { authors, posts, count, pagination } = data?.blogSearch ?? {}
    const { pageCount, page } = pagination ?? {};

    return (
        <main>
            <div className='mb-10 font-bold text-5xl'>
                {count} Results for <span className='text-secondary'>{query}</span>
            </div>

            {
                authors?.count > 0 && (
                    <section>
                        <h2>People :</h2>
                        <div className='grid lg:grid-cols-2 gap-12'>
                            {authors?.results?.map((a) => {
                                return <AuthorsSearch key={a.username} {...a} />
                            })}

                        </div>
                    </section>

                )
            }
            <br />
            {
                posts?.count > 0 && (
                    <section className='my-12'>
                        <h2>articles :</h2>
                        <div className='grid md:grid-cols-2 gap-12'>
                            {posts?.results?.map((post) => {
                                return <PostsSearch key={post._id} {...post} />;
                            })}

                        </div>
                    </section>
                )
            }

            <Pagination pageCount={pageCount} page={page} />
        </main>
    )
};

export default Search;
