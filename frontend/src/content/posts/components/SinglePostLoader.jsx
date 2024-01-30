import Skeleton from 'react-loading-skeleton';

const SinglePostLoader = ({ cards }) => {
    return (
        <div className="body-container grid gap-10 mt-5">
            {Array(cards).fill(0).map((_, index) => (
                <div key={index}>
                    {/* Loading state */}
                    <div className="flex items-center space-x-3">
                        <Skeleton width={40} height={40} circle />
                        <Skeleton width={90} />
                    </div>

                    <div className="flex flex-col-reverse justify-between space-x-0 space-y-5 lg:space-y-0">
                        <div className="flex-grow">
                            <div className="flex justify-between">
                                <div className='flex space-x-1'>
                                    <Skeleton width={20} />
                                    <Skeleton width={20} />
                                </div>
                                <Skeleton width={20} />
                            </div>
                            <div className="pt-2">
                                <Skeleton count={16} />
                            </div>
                        </div>
                        <figure className="flex-shrink-0 pb-5 ">
                            <Skeleton height={320} />
                        </figure>
                    </div>
                    <br />
                    <hr />
                </div>
            ))}
        </div>
    )
};

export default SinglePostLoader;
