import PostDetails from "../components/PostDetails";
import SimilarPosts from "../components/SimilarPosts";
// import { useHandleViewsOnResize } from "../hooks/usePostsCustomHooks";

const SinglePostPage = () => {
    // const { incrementViewCount } = useHandleViewsOnResize()
    // incrementViewCount()
    return (
        <main className="body-container mb-16 flex flex-col lg:flex-row justify-between lg:space-x-5 space-x-0 space-y-5 lg:space-y-0">
            <section className="flex-grow lg:ml-5 order-1 lg:order-1">
                <PostDetails />
            </section>
            <section className="mt-8 lg:mt-0 lg:w-1/3 flex-shrink-0 order-1 lg:order-2 lg:border-l lg:pl-2 lg:sticky lg:top-8 lg:h-screen">
                <SimilarPosts />
            </section>
        </main>
    );
};

export default SinglePostPage;