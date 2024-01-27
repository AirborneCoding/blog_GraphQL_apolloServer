import { useState } from "react";

const TextAreaInput = ({ name, label, defaultValue, required, size, holder, shadow, shadowColor, }) => {
    // maxCharacters, text, setText
    const maxCharacters = 150
    const [text, setText] = useState(defaultValue || "");

    const sizing = size || "xs"

    const handleTextChange = (e) => {
        const newText = e.target.value;
        if (newText.length <= maxCharacters) {
            setText(newText);
        }
    };

    return (
        <div className="form-control w-full">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                name={name}
                defaultValue={defaultValue}
                required={required ? true : false}
                placeholder={holder}
                // value={text}
                // onChange={handleTextChange}
                className={`textarea textarea-bordered shadow-${shadow} shadow-${shadowColor} rounded-3xl textarea-${sizing} text-sm`}
            // className="form-textarea"
            // className="textarea textarea-bordered textarea-lg"
            />
            <div className="text-gray-500 text-sm mt-2">
                {text?.length}/{maxCharacters} characters
            </div>
        </div>
    );
};

export default TextAreaInput;
// textarea textarea-bordered textarea-lg