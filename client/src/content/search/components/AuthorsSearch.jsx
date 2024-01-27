import { Link } from "react-router-dom";

const AuthorsSearch = (props) => {
    return (
        <article className="flex space-x-5 items-center">
            <figure>
                <img
                    src={props.avatar?.url}
                    alt={props.username}
                    className="h-16 w-16 rounded-full object-cover"
                    loading="lazy"
                />
            </figure>
            <div>
                <h4 className="font-bold hover:underline">
                    <Link to={`/${props?.username}`}>
                        {props.username}
                    </Link>
                </h4>
                <p className="-mt-3">{props?.bio === null ? "" : "ww"}</p>
            </div>
        </article>
    )
};

export default AuthorsSearch;
