import { Controller } from "react-hook-form";

const InputText = ({ name, label, control, rules, type, errors, size, holder, shadow, shadowColor }) => {
  const sizing = size || "xs"
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-pretty text-sm font-bold mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            type={type || "text"}
            {...field}
            id={name}
            value={field.value || ""}
            className={`input input-bordered shadow-${shadow} shadow-${shadowColor} rounded-3xl input-${sizing} w-full`}
            placeholder={holder}
          />
        )}
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
};

export default InputText;