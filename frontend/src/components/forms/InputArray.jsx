import { Controller } from "react-hook-form";

const InputArray = ({ name, label, control, rules, errors, array }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <select
                        {...field}
                        id={name}
                        className="input input-bordered w-full"
                    >
                        <option value="" className="text-gray-700" >Select {label}</option>
                        {
                            array?.map((value, index) => {
                                return <option key={index} value={value}>
                                    {value}
                                </option>
                            })
                        }
                    </select>
                )}
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
        </div>
    );
};

export default InputArray;