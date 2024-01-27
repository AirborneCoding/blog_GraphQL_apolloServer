import Skeleton from 'react-loading-skeleton';

const ProfileLoader = ({ cards }) => {
    return (
        <>
            {Array(cards).fill(0).map((_, index) => (
                <div key={index} className="flex lg:flex-col space-x-7 lg:space-x-0 items-center">
                    <figure>
                        <Skeleton
                            circle width={200} height={200}
                            className="lg:h-44 lg:w-44 w-32 h-32 rounded-full object-cover border-2"
                        />
                    </figure>
                    <div className="">
                        <h1 className="mt-5 font-bold">
                            <Skeleton width={80} />
                        </h1>
                        <h3 className="font-light flex space-x-2">
                            <Skeleton width={10} /> <Skeleton width={80} />
                        </h3>
                        <p className="mt-4">
                            <Skeleton width={200} />
                        </p>
                        <button >
                            <Skeleton width={80} height={50} />
                        </button>
                    </div>
                </div>
            ))}
        </>

    )
};

export default ProfileLoader;

/* 
<div key={index}>
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
                </div >
*/