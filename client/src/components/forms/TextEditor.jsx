import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({ label, name, defaultValue, required, type }) {
    const [content, setContent] = useState(defaultValue || "");
    const quillId = `quill-${name}`;

    const handleEditorChange = (value) => {
        setContent(value);
        document.getElementById(`hidden-${quillId}`).value = value;
        // onChange(value);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };

    // Add image and video modules if type is 'content'
    if (type === 'content') {
        modules.toolbar[3] = ['link', 'image', 'video'];
    }

    return (
        <div className="form-control w-full">
            <label className='label'>
                <span className='label-text capitalize'>{label}</span>
            </label>
            <ReactQuill
                id={quillId}
                theme="snow"
                className='h-44 mb-16'
                value={content}
                onChange={handleEditorChange}
                modules={modules}
                defaultValue={content}
            />
            {/* Hidden input to store the content */}
            <input
                type="hidden"
                name={name}
                defaultValue={content}
                id={`hidden-${quillId}`}
                required={required ? true : false}
            />

            {/* <p className="" dangerouslySetInnerHTML={{ __html: content }} /> */}
        </div>
    );
}

export default TextEditor;




