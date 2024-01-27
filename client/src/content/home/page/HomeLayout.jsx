import { Outlet } from "react-router-dom";
import Navbar from "../../../components/layouts/Navbar";
import { usefetchUserProfile } from "../../dashboard/hooks/useDashboardCustomHook";
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";

const HomeLayout = () => {
    const { user } = useSelector(state => state.auth)

    if (user) {
        var { userData } = usefetchUserProfile()
    }

    // let { user } = useSelector((state) => state.auth);
    // let [userData, setUserData] = useState(null);

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //         if (user) {
    //             const { userData: fetchedUserProfile } = await usefetchUserProfile();
    //             setUserData(fetchedUserProfile?.getUserProfile ?? {});
    //         }
    //     };
    //     fetchUserProfile();
    // }, [user]);


    return <>
        <Navbar userData={userData?.getUserProfile ?? {}} />
        <main className="body-container my-16 py-10">
            <Outlet context={userData = userData?.getUserProfile ?? {}} />
        </main>
    </>
};

export default HomeLayout;
