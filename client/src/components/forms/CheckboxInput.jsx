// const CheckboxInput = ({ label, name, defaultValue }) => {
//   return (
//     // items-center
//     <div className='form-control w-full '>
//       <label className='label cursor-pointer  '>
//         <span className='label-text capitalize '>{label}</span>
//       </label>
//       <input
//         type='checkbox'
//         name={name}
//         defaultChecked={defaultValue}
//         // checked={defaultValue}
//         className='checkbox checkbox-primary checkbox-xs ml-2'
//       />
//     </div>
//   );
// };
// export default CheckboxInput;


const CheckboxInput = ({ label, name, defaultValue }) => {
  return (
    <div className='form-control w-full'>
      <div className="flex items-center">
        <input
          type='checkbox'
          name={name}
          defaultChecked={defaultValue}
          className=''
        />
        <label className='label cursor-pointer '>
          <span className='label-text capitalize'>{label}</span>
        </label>
      </div>
    </div>
  );
};
export default CheckboxInput;



// import React, { useState } from "react";

// const CheckboxInput = () => {
//   const [completed, setCompleted] = useState(false)
//   return <div className="form-row flex items-center space-x-3">
//     <input
//       id="checkbox"
//       type="checkbox"
//       className=""
//       name="completed"
//       checked={completed}
//       onChange={(e) => setCompleted(e.target.checked)}
//     />
//     <label htmlFor="checkbox" className="">Task completed :</label>
//   </div>
// };

// export default CheckboxInput;
