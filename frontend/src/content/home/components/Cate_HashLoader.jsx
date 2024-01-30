import Skeleton from 'react-loading-skeleton';

const Cate_HashLoader = ({ cards }) => {
    return (
        <div className="mb-10 mt-5 lg:pl-5 ">
            <Skeleton width={80} height={10} />
            <div className="flex space-x-5">
                {Array(cards).fill(0).map((_, index) => (
                    <div key={index} className="flex flex-wrap space-x-3" >
                        <Skeleton width={80} />
                    </div>
                ))}
            </div>
            {/* ss */}
            <br />
            <Skeleton width={80} height={10} />
            <div className="flex space-x-5">
                {Array(cards).fill(0).map((_, index) => (
                    <div key={index} className="flex flex-wrap space-x-3" >
                        <Skeleton width={80} />
                    </div>
                ))}
            </div>
            <hr className='mt-2' />
        </div>
    )
};

export default Cate_HashLoader;
