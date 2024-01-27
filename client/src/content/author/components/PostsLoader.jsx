import Skeleton from 'react-loading-skeleton';

const PostsLoader = ({ cards }) => {
    return (
        <div className="body-container grid gap-8 mt-5">
            {Array(cards).fill(0).map((_, index) => (
                <div key={index}>
                    {/* Loading state */}
                    <Skeleton width={90} />

                    <div className="flex flex-col-reverse lg:flex-row justify-between lg:space-x-5 space-x-0 space-y-5 lg:space-y-0">
                        <div className="flex-grow">
                            <div className="pt-2">
                                <Skeleton count={1} />
                                <Skeleton count={2} className='mt-3' />
                            </div>
                            <div className="flex justify-between mt-3">
                                <Skeleton width={100} />
                                <div className="flex items-center space-x-2 ">
                                    <Skeleton width={30} />
                                    <Skeleton width={30} />
                                </div>
                            </div>
                        </div>
                        <figure className="lg:mt-0 lg:w-1/3 flex-shrink-0 lg:pl-2 pb-5 lg:pb-0">
                            <Skeleton height={200} />
                        </figure>
                    </div>
                    <br />
                    <hr />
                </div>
            ))}
        </div>
    )
};

export default PostsLoader;
