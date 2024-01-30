import Skeleton from 'react-loading-skeleton';

const AsideTopLoader = ({ cards }) => {
    return (
        <div className="mb-10 mt-5 lg:pl-5 ">
            <Skeleton width={80} height={10} />
            <div className="flex space-x-5">
                {Array(cards).fill(0).map((_, index) => (
                    <div key={index} className="flex space-x-3" >
                        <Skeleton circle width={40} height={40} />
                        <div className='flex flex-col -space-y-2'>
                            <Skeleton width={40} height={8} />
                            <Skeleton width={40} height={8} />
                        </div>
                    </div>
                ))}
            </div>
            <hr className='mt-2' />
        </div>
    );
};

export default AsideTopLoader;
