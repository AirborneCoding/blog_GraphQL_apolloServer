// this applied when user exist or not

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedAuth({ children, isExist }) {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    useEffect(() => {
        if (isExist) {
            if (user) navigate("/");
        }
        if (!isExist) {
            if (!user) navigate("/");
        }
    }, [user, navigate]);

    return <>{children} </>;

}
