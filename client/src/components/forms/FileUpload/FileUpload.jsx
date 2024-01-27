import React, { useState } from 'react';
import './FileUpload.scss';
import { FaCloudUploadAlt } from '../../../assets/icons';
import { CiCircleRemove } from "../../../assets/icons";

const FileUpload = ({ label, name, defaultValue, type, supportedFiles, multiple, forWhat, onChange }) => {

    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(defaultValue || null);

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const uploadHandler = (event) => {
        const selectedFiles = event.target.files;

        if (!selectedFiles || selectedFiles.length === 0) return;

        if (multiple) {
            // Handle multiple files
            const newFiles = Array?.from(selectedFiles)?.map((file) => {
                file.isUploading = true;

                // Create a preview URL for images
                const previewURL = file?.type?.startsWith('image/')
                    ? URL.createObjectURL(file)
                    : null;

                return { file, previewURL };
            });

            setFiles([...files, ...newFiles]);
        } else {
            // Handle a single file
            const file = selectedFiles[0];
            if (!file) return;
            file.isUploading = true;

            // Create a preview URL for images
            const previewURL = file?.type?.startsWith('image/')
                ? URL.createObjectURL(file)
                : null;

            setFiles([{ file, previewURL }]);
        }

        // Call the onChange prop with the updated files array
        onChange(files);
    };

    const getAcceptType = () => {
        switch (type?.toLowerCase()) {
            case 'image':
                return 'image/*';
            case 'video':
                return 'video/*';
            case 'pdf':
                return '.pdf';
            // Add more cases as needed for other file types
            default:
                return '*/*'; // Accept all file types if no match
        }
    };


    //TODO: profile
    // if (forWhat === "profile") {
    //     return 
    // }




    // others
    return (
        <div className='form-row'>
            {/* label */}
            <label htmlFor={`dropzone-${name}`} className="form-label capitalize">
                {label}
            </label>
            {/* input uploader  file-card */}
            <div className="file-card">
                <div className="file-inputs">
                    <input
                        name={name}
                        type="file"
                        id={`dropzone-${name}`}
                        accept={getAcceptType()}
                        onChange={uploadHandler}
                        multiple={multiple}
                    />
                    <button>
                        <FaCloudUploadAlt size={40} className='mr-3' />
                        {/* <i> </i> */}
                        Upload
                    </button>
                </div>
                {supportedFiles && (
                    <>
                        <p className="main">Supported files</p>
                        <p className="info">{supportedFiles}</p>
                    </>
                )}
                {/* appear uploaded files */}
                <div className={`${multiple ? "file-preview w-full" : "w-full"} `}>
                    {files?.map((file, index) => (
                        <div key={index} className={`${forWhat === "profile" ? " grid place-content-center" : "preview-item my-3"}`}>
                            <button onClick={() => removeFile(index)} className='flex space-x-1 mb-0.5 bg-red-500 px-1 text-white' >
                                <CiCircleRemove size={20} className='font-extrabold' />
                                <span>remove</span>
                            </button>
                            {file.previewURL && <img
                                loading="lazy"
                                className={`${forWhat === "profile" ? "h-48 w-48 rounded-full object-cover" : "h-56 w-full object-cover"}`}
                                src={file.previewURL} alt={file.name} />}
                            <p>{file.name}</p>
                        </div>
                    ))}
                </div>
                {/* {
                    defaultValue ? (
                        <img src={defaultValue} className={`${forWhat === "profile" ? "h-48 w-48 rounded-full object-cover" : "h-56 w-full object-cover"}`} />
                    )
                        : (
                            <div className={`${multiple ? "file-preview w-full" : "w-full"} `}>
                                {files?.map((file, index) => (
                                    <div key={index} className={`${forWhat === "profile" ? " grid place-content-center" : "preview-item my-3"}`}>
                                        <button onClick={() => removeFile(index)} className='flex space-x-1 mb-0.5 bg-red-500 px-1 text-white' >
                                            <CiCircleRemove size={20} className='font-extrabold' />
                                            <span>remove</span>
                                        </button>
                                        {file.previewURL && <img
                                            className={`${forWhat === "profile" ? "h-48 w-48 rounded-full object-cover" : "h-56 w-full object-cover"}`}
                                            src={file.previewURL} alt={file.name} />}
                                        <p>{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        )
                } */}

            </div>

        </div>
    );
};
export default FileUpload;