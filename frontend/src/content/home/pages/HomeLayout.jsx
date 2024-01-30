import { Outlet } from "react-router-dom";
import { Navbar } from "../../../components";
import { usefetchUserProfile } from "../../dashboard/hooks/useDashboardCustomHooks";
import { useSelector } from "react-redux"

const HomeLayout = () => {
    const { user } = useSelector(state => state.auth)
    if (user) {
        var { userData } = usefetchUserProfile()
    }
    return <>
        <Navbar userData={userData ?? {}} />
        <main className="body-container my-16 py-10">
            <Outlet context={userData = userData ?? {}} />
        </main>
    </>
};

export default HomeLayout;