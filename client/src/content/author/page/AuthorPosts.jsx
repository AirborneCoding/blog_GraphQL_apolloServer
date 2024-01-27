import React from "react";
import PostsCard from "../components/PostsCard";
import { Pagination } from "../../../components"
import { useFetchAuthorPosts } from "../hooks/useAuthorsCustomHooks";
import PostsLoader from "../components/PostsLoader";

const AuthorPosts = () => {
  const { data, isLoading, isError, error } = useFetchAuthorPosts()

  if (isLoading) {
    return <PostsLoader cards={4} />
  }

  if (isError) {
    return <div>error...</div>
  }

  const { posts, count, pagination } = data?.getAuthorPosts ?? {}

  const authorPosts = posts ?? []
  const { pageCount, page } = pagination ?? {};


  return (
    <article className="mt-5">
      {
        authorPosts?.map((p, index) => {
          return <PostsCard key={index} {...p} />
        })
      }
      <Pagination pageCount={pageCount} page={page} />
    </article>
  )
};

export default AuthorPosts;
