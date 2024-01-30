import React from "react";
import { fetchTop5_C_H } from "../hooks/useHomeCustomHooks";
import Cate from "./Cate";
import Hash from "./Hash";
import Cate_HashLoader from "./Cate_HashLoader";

const TopCa_Ha = () => {
    const { data, error, isError, isLoading } = fetchTop5_C_H()
    if (isLoading) {
        return <Cate_HashLoader cards={5} />
    }
    if (isError) {
        console.log(error);
        return <div>something went wrong...</div>
    }
    return (
        <article className="lg:my-24 my-8 lg:ml-5">
            {/* Cate */}
            <div>
                <h3 className="text-sm">Recommended Categories:</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        data?.topCategories?.map((c, index) => {
                            return <Cate key={index} {...c} />
                        })
                    }
                </div>
            </div>

            {/* Hash */}
            <div className="lg:my-24 my-8" >
                <h3 className="text-sm">Recommended Hashtags:</h3>
                <div className="flex flex-wrap gap-2">
                    {
                        data?.topHashtags?.map((c, index) => {
                            return <Hash key={index} {...c} />
                        })
                    }
                </div>
            </div>
        </article>
    );
};

export default TopCa_Ha;
