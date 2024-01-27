import Skeleton from 'react-loading-skeleton';

const LoadingPosts = ({ cards }) => {
    return (
        <div className='body-container grid gap-10'>
            {Array(cards).fill(0).map((_, index) => (
                <div key={index}>
                    <Skeleton height={180} />
                    <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
                        <div className="flex items-end space-x-2 my-2">
                            <Skeleton width={40} height={40} circle />
                            <Skeleton width={40} className='mb-1.5' />
                        </div>
                        {/* <div>
                            <Skeleton width={100} />
                        </div> */}
                    </div>
                    <Skeleton />
                    <hr />
                    <Skeleton height={50} />
                </div>
            ))}
        </div>
    );
};

export default LoadingPosts;