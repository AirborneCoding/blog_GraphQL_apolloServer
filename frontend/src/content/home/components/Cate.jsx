
import { Link } from "react-router-dom";

const Cate = (props) => {
    return (
        <div className="rounded-lg px-2 py-1 bg-info w-fit" >
            <Link to={`/category/${encodeURIComponent(props?._id)}`} className="text-sm font-semibold hover:underline">{props?._id} {" . "}{props?.count}</Link>
        </div>
    );
};

export default Cate;
