// SubmitBtn.js
import React from "react";

const SubmitBtn = ({ text, name, value, size, shadow, shadowColor, disabled, isSubmitting }) => {
  const sizing = size || "xs";

  return (
    <div className="form-controll w-full mt-10">
      <button
        name={name}
        value={value}
        type='submit'
        className={`cursor-pointer transition-all duration-700 border-2 font-bold py-3 text-[18px] text-gray-600 hover:text-white hover:bg-gray-800 w-full md:w-[500px] lg:w-[650px] mx-auto shadow-${shadow} shadow-${shadowColor} rounded-3xl input-${sizing}`}
        disabled={disabled}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }} // Set cursor style based on disabled state
      >
        {isSubmitting ? (
          <>
            <span className='loading loading-spinner'></span>
            Loading...
          </>
        ) : (
          text || 'submit'
        )}
      </button>
    </div>
  );
};

export default SubmitBtn;
