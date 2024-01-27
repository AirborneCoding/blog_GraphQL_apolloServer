import React, { useState } from 'react';

const FormArrayInput = ({ label, name, defaultValue }) => {
    const [tags, setTags] = useState(defaultValue || []);

    function handleKeyDown(e) {
        if (e.key !== ' ' && e.key !== 'Enter') return;
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value.trim()]);
        e.target.value = '';
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text capitalize">{label}</span>
            </label>
            <div className="tags-input-container">
                {tags.map((tag, index) => (
                    <div className="tag-item" key={index}>
                        <span className="text">{tag}</span>
                        <span className="close" onClick={() => removeTag(index)}>
                            &times;
                        </span>
                    </div>
                ))}
                <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="tags-input"
                    placeholder={`Type ${label}`}
                />
            </div>
            {/* Hidden input to store all hashtags */}
            <input
                type="hidden"
                // name={`hidden-${name}`}
                name={name}
                id={`hidden-${name}`}
                value={tags.join(',')}
            />
        </div>
    );
};

export default FormArrayInput;















/* 
!good
import React, { useState } from "react";

const FormArray = () => {
    const [tags, setTags] = useState([]);

    function handleKeyDown(e) {
        if (e.key !== ' ' && e.key !== 'Enter') return; // Change to ' ' to treat Space key as well
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value.trim()]);
        e.target.value = '';
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    return (
        <div className="tags-input-container">
            {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>
                        &times;
                    </span>
                </div>
            ))}
            <input
                onKeyDown={handleKeyDown}
                type="text"
                className="tags-input"
                placeholder="Type something"
            />
        </div>
    );
};

export default FormArray;
*/



