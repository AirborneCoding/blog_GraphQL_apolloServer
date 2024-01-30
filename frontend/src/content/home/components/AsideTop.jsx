import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { fetchTop5authors } from "../hooks/useHomeCustomHooks";
import AsideTopLoader from './AsideTopLoader';

const AsideTop = () => {

    const { data, error, isError, isLoading } = fetchTop5authors()

    if (isLoading) {
        return <AsideTopLoader cards={5} />
    }
    if (isError) {
        console.log(error);
        return <div>something went wrong...</div>
    }
    return (
        <div className="lg:pl-5">
            <h3 className="text-sm">Top 5 authors:</h3>
            <Swiper
                className='cursor-pointer'
                // spaceBetween={10}
                slidesPerView={3}
                width={400}
            >
                {
                    data?.map((author) => {
                        return <SwiperSlide key={author.username} >
                            <div className="flex space-x-3" >
                                <figure>
                                    <img
                                        src={author.avatar?.url}
                                        className="rounded-full w-8 h-8"
                                        loading="lazy"
                                        alt={author.username}
                                    />
                                </figure>
                                <div>
                                    <Link to={`/${author.username}`} >
                                        <h5 className="text-sm -mb-1 hover:underline">{author.username}</h5>
                                    </Link>
                                    <h4 className="text-xs">total posts : {author?.postCount}</h4>
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
            <hr />
        </div>
    );
};

export default AsideTop;
