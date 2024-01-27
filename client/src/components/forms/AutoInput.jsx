import React, { useState } from "react";

const FormInput = ({ label, name, type, required, size, holder, shadow, shadowColor, list, defaultValue }) => {
    const sizing = size || "xs";
    const [inputValue, setInputValue] = useState(defaultValue || "");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(value?.trim().length > 0);
    };

    const handleCategoryClick = (category) => {
        setInputValue(category.name);
        setShowSuggestions(false);
    };

    const handleInputClick = () => {
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    const filteredCategories = list?.filter(category =>
        category?.name?.toLowerCase()?.includes(inputValue?.toLowerCase())
    );

    return (
        <div className="form-control w-full relative">
            <label className="label">
                <span className="label-text capitalize">{label}</span>
            </label>
            <input
                type={type}
                name={name}
                value={inputValue}
                onChange={handleInputChange}
                onClick={handleInputClick}
                onBlur={handleInputBlur}
                className={`input input-bordered shadow-${shadow} shadow-${shadowColor} rounded-3xl input-${sizing}`}
                required={required ? true : false}
                placeholder={holder}
                autoComplete="off"
            />
            {/* absolute */}
            {showSuggestions && (
                <ul className="autocomplete-list bg-blog rounded-xl px-5 py-2 mt-1 text-white  overflow-y-auto max-h-60 z-10">
                    {filteredCategories.length > 0 ? (
                        filteredCategories?.map((category, index) => (
                            <li key={index} onClick={() => handleCategoryClick(category)} className="cursor-pointer hover:bg-blue-500 my-1 py-1">
                                {category.name}
                            </li>
                        ))
                    ) : (
                        <li className="no-match-message">No Category matched</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default FormInput;












/* import React, { useState } from "react";

const FormInput = ({ label, name, type, defaultValue, required, size, holder, shadow, shadowColor, list }) => {
    const sizing = size || "xs";
    const [inputValue, setInputValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(value.trim().length > 0);
    };

    const handleCategoryClick = (category) => {
        setInputValue(category.name);
        setShowSuggestions(false);
    };

    const filteredCategories = list.filter(category =>
        category?.name.toLowerCase().includes(inputValue?.toLowerCase())
    );

    const handleBlur = () => {
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text capitalize">{label}</span>
            </label>
            <input
                type={type}
                name={name}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(inputValue.trim().length > 0)}
                onBlur={handleBlur}
                className={`input input-bordered shadow-${shadow} shadow-${shadowColor} rounded-3xl input-${sizing}`}
                required={required ? true : false}
                placeholder={holder}
            />
            {showSuggestions && (
                <ul className="autocomplete-list bg-gray-100 rounded-xl px-5 py-2 mt-1 text-white">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, index) => (
                            <li key={index} onClick={() => handleCategoryClick(category)} className="cursor-pointer hover:bg-blue-500 my-1 py-1">
                                {category.name}
                            </li>
                        ))
                    ) : (
                        <li className="no-match-message">No Category matched</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default FormInput;



 */