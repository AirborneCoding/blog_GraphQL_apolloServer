import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import SearchInput from "./SearchInput";
import { IoMdNotifications, TfiWrite } from "../../assets/icons"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../../redux/slices/authSlice";
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const Navbar = ({ userData }) => {

    const dispatch = useDispatch()

    const handleTheme = () => {
        dispatch(toggleTheme());
    };

    const theme = useSelector((state) => state.auth.theme);
    const isDarkTheme = theme === 'night';

    const { user } = useSelector(state => state.auth)


    return <header className="py-2 border-b-2" >
        <nav className="flex justify-between body-container">

            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-5">
                    <Link to="/" className="text-black pt-4">
                        <h2 className="text-xl md:text-3xl font-bold ">
                            <span className="bg-gray-800 text-white px-1 rounded-md shadow-lg mr-0.5" >Air</span>borne
                        </h2>
                    </Link>
                </div>
                <SearchInput />
            </div>
            <div className="flex items-center space-x-4">
                <label className='swap swap-rotate'>
                    <input
                        type='checkbox'
                        onChange={handleTheme}
                        defaultChecked={isDarkTheme}
                    />
                    {/* sun icon*/}
                    <BsSunFill className='swap-on h-4 w-4' />
                    {/* moon icon*/}
                    <BsMoonFill className='swap-off h-4 w-4' />
                </label>

                {
                    user
                        ? (
                            <>
                                <Link to="/new_post" className="flex space-x-2"
                                >
                                    <TfiWrite size={26} />
                                    <div className="text-base font-bold">Write</div>
                                </Link>
                                {/* <button>
                                    <IoMdNotifications size={28} />
                                </button> */}
                                <Link to="/my_profile">
                                    <img
                                        src={userData.avatar?.url || "/default.png"}
                                        alt="user profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                        loading="lazy"
                                    />
                                </Link>
                            </>
                        )
                        : (

                            <>
                                <Link to="/login" className="btn"
                                >
                                    Login
                                </Link>
                            </>

                        )
                }
            </div>
        </nav>
    </header>;
};

export default Navbar;
