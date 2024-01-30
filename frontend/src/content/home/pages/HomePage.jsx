import React from "react";
import { HomePosts } from "../../pages"
import AsideTop from "../components/AsideTop";
import TopCa_Ha from "../components/TopCa_Ha";
const HomePage = () => {
    return (
        <main className="flex flex-wrap body-container">
            <section className="w-full lg:w-2/3 order-2 lg:order-1">
                <HomePosts />
            </section>
            <aside className="w-full lg:w-1/3 order-1 lg:order-2 lg:sticky lg:top-8 lg:h-screen lg:overflow-y-auto">
                <AsideTop />
                <TopCa_Ha />
            </aside>
        </main>

    )
};

export default HomePage;


// fixed