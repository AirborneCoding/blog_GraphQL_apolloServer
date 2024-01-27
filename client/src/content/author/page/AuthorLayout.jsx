import React from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import AuthorInfo from "../components/AuthorInfo";
import { useFetchAuthorProfile } from "../hooks/useAuthorsCustomHooks";

const AuthorLayout = () => {

    window.scrollTo(0, 100)

    const { authorName } = useParams();
    const location = useLocation();

    const isPostsActive = location.pathname === `/${authorName}`;
    const isAboutActive = location.pathname === `/${authorName}/about`;

    const { data, isLoading, isError, error } = useFetchAuthorProfile()


    if (isError) {
        console.log(error);
        return <div>something wet wrong here</div>
    }
    const author = data?.getAuthorProfile ?? {}

    return (
        <main className="flex flex-col lg:flex-row justify-between lg:space-x-5 space-x-0 space-y-5 lg:space-y-0 ">
            <section className="flex-grow lg:ml-5 order-1 lg:order-1 mt-10 lg:mt-0">
                <div className="flex space-x-8 border-b-2">
                    <Link to={`/${authorName}`} className={`pb-4 ${isPostsActive ? 'border-b-4 border-accent' : ''}`}>
                        Posts
                    </Link>
                    <Link to={`/${authorName}/about`} className={`pb-4 ${isAboutActive ? 'border-b-4 border-accent' : ''}`}>
                        About
                    </Link>
                </div>
                <Outlet context={{ authorDesc: author?.description }} />
            </section>
            <section
                className="lg:w-1/3 flex-shrink-0 lg:order-2 lg:border-l lg:pl-2"
            >
                <AuthorInfo
                    author={author}
                    loading={isLoading}
                    error={error}
                />
            </section>
        </main>
    );
};

export default AuthorLayout;
