import ProfileLoader from "./ProfileLoader";

const AuthorInfo = ({ author, loading, error }) => {

    if (loading) {
        return <ProfileLoader cards={1} />
    }

    return (
        <>
            <div className="flex lg:flex-col space-x-7 lg:space-x-0 items-center">
                <figure>
                    <img
                        src={author.avatar?.url}
                        alt={author.username}
                        className="lg:h-44 lg:w-44 w-32 h-32 rounded-full object-cover border-2"
                        loading="lazy"
                    />
                </figure>
                <div className="">
                    <h1 className="mt-5 font-bold">
                        {author.username}
                    </h1>
                    <h3 className="font-light">
                        {author.followersCount} Followers
                    </h3>
                    <p className="mt-4">
                        {author?.bio}
                    </p>
                    <button className="btn btn-success">
                        Follow
                    </button>
                </div>
            </div>
        </>
    );
};

export default AuthorInfo;
