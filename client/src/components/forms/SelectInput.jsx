// const SelectInput = ({ label, name, list, defaultValue }) => {
//   return (
//     <div className='form-control w-full '>
//       <label className='label'>
//         <span className='label-text capitalize'>{label}</span>
//       </label>
//       <select
//         className='select select-bordered select-xs'
//         name={name}
//         defaultValue={defaultValue} // Change defaultValue to value
//       >
//         <option disabled value="">
//           Select option
//         </option>
//         {list.map((item) => {
//           return (
//             <option key={item} value={item}>
//               {item}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// };
// export default SelectInput;


const SelectInput = ({ label, name, list, defaultValue, size, onChange }) => {
  // Convert the object values into an array
  const options = Object.values(list);

  const sizing = size || "xs"
  return (
    <div className='form-control w-full '>
      <label className='label'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      <select
        className={`select select-bordered select-${sizing}`}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <option disabled value="">
          Select option
        </option>
        {options?.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
