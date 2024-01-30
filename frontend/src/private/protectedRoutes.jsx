import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) navigate("/");
    }, [user, navigate]);

    return <>{children} </>;
}

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import PropTypes from "prop-types"; // install it

// const ProtectedRoute = ({ children }) => {
//     const navigate = useNavigate();
//     const { user } = useSelector((state) => state.auth);

//     useEffect(() => {
//         if (!user) navigate("/");
//     }, [user, navigate]);

//     return <>{children}</>;
// };

// ProtectedRoute.propTypes = {
//     children: PropTypes.node.isRequired,
// };

// export default ProtectedRoute;
