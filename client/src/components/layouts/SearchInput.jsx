import { useNavigate } from "react-router-dom"
import { getFormValues } from "../../helpers"
const SearchInput = () => {

    const Navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        let { data } = getFormValues(e.currentTarget)
        if (data?.search !== '') {
            Navigate(`/search?q=${encodeURIComponent(data?.search)}`);
        }
    }

    return <form onSubmit={onSubmit}>
        <input
            type="search"
            placeholder="Type here"
            className="input input-bordered input-md md:w-96 w-full max-w-xs"
            name="search"
        />
    </form>;
};

export default SearchInput;
