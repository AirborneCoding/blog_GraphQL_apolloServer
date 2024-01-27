const SearchInput = ({ name, label, defaultValue, holder, onChange, size, shadow, shadowColor, width }) => {
    const sizing = size || "xs";

    return (
        <div className="form-control">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                type="search"
                className={`input input-bordered w-[${width}] shadow-${shadow} shadow-${shadowColor} rounded-3xl input-${sizing}`}
                name={name}
                defaultValue={defaultValue}
                placeholder={holder}
                onChange={onChange}
                autoComplete="off"
            />
        </div>
    );
};

export default SearchInput;

//w-[360px] md:w-[500px] lg:w-[650px] mx-auto