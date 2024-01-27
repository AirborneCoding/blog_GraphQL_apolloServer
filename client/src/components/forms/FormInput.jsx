const FormInput = ({ label, name, type, defaultValue, required, size, holder, shadow, shadowColor }) => {
    const sizing = size || "xs"
    return (
        <div className='form-control w-full'>
            <label className='label'>
                <span className='label-text capitalize'>{label}</span>
            </label>
            <input
                type={type}
                name={name}
                defaultValue={defaultValue}
                className={`input input-bordered shadow-${shadow} shadow-${shadowColor} rounded-3xl input-${sizing}`}
                required={required ? true : false}
                placeholder={holder}
            />
        </div>
    );
};
export default FormInput;
// w-[400px] md:w-[500px] lg:w-[650px] mx-auto 