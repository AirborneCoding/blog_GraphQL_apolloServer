
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils";
import { useFetchSimilarPosts } from "../hooks/usePostsCustomHooks";

const SimilarPosts = () => {
    const {
        data,
        error,
        isLoading,
        isError
    } = useFetchSimilarPosts()

    if (isLoading) {
        return <div>loading...</div>
    }
    if (isError) {
        console.log(error);
        return <div>Something went wrong</div>
    }

    return (
        <article className="flex space-y-4 flex-col mt-10 lg:mt-0">
            <h2 className="text-xl font-bold ">
                similar Posts :
            </h2>
            <hr className="mb-4" />
            <div className="space-y-10">
                {
                    data?.map((post) => {
                        //flex justify-between items-center
                        return (
                            <div key={post.slug} className="">
                                <div className="flex space-x-3">
                                    <div>
                                        <img
                                            loading="lazy"
                                            src={post?.user?.avatar?.url}
                                            alt={post?.user?.username}
                                            className="h-10 w-10 rounded-full object-cover" />
                                    </div>
                                    <div className="flex flex-col text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Link to={`/${post?.user.username}`} className="hover:underline" >{post?.user?.username}</Link>
                                            <span>• {formatDate(post?.createdAt)}</span>
                                        </div>
                                        <Link to={`/posts/search?category=${post?.category}`} className="mt-1 bg-blog w-fit text-white px-0.5 rounded-md hover:underline">{post?.category}</Link>
                                    </div>
                                </div>


                                <div className="flex flex-col xl:flex-row justify-between">
                                    <h2 className="mt-3 font-semibold hover:underline mb-2 text-sm">
                                        <Link to={`/posts/${post?.slug}`} >
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <figure className="xl:ml-2">
                                        <img
                                            loading="lazy"
                                            src={post?.image?.url}
                                            alt={post?.title}
                                            className="w-full h-32 lg:h-20 object-cover rounded-lg"
                                        />
                                    </figure>
                                </div>
                                <div className="text-sm space-x-1" >
                                    <span>{post?.likes.length} likes</span>{" . "}
                                    <span>{post?.commentsCount} comments</span>{" . "}
                                    <span>{post?.viewsCount} views</span>

                                </div>
                                <hr className="my-3" />
                            </div>
                        )

                    })
                }
            </div>

        </article>
    );
};

export default SimilarPosts;
